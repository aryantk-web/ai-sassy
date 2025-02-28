import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const planLimits: { [key: string]: number } = {
    [process.env.NEXT_PUBLIC_PREMIUM]: 100,  // Pro plan
    [process.env.NEXT_PUBLIC_ULTIMATE]: 300   // Premium plan
  };

  console.log("Plan limits:", planLimits);

  switch (event.type) {

    case "billing_portal.session.created":{
      console.log(" inside billing portal session created event");
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      console.log("Subscription:", JSON.stringify(subscription, null, 2));
    }

    case "invoice.payment_succeeded": {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      console.log("Subscription:", JSON.stringify(subscription, null, 2));

      const metadata = subscription.metadata;
      const { userId, stripePriceId } = metadata;

      const count =planLimits[subscription.items.data[0].price.id];

      try {
        // Create or update UserSubscription
        await prismadb.userSubscription.upsert({
          where: {
            userId: userId,
          },
          update: {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId:subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
          create: {
            userId: userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });


        // Upsert UserApiLimit - either update count if it exists, or create a new record
        await prismadb.userApiLimit.upsert({
          where: {
            userId: userId,
          },
          update: {
            count: count || 15,
            limit: count || 15,
          },
          create: {
            userId: userId,
            count: count || 15,
            limit: count || 15,
          },
        });

        return new NextResponse(JSON.stringify({
          redirectUrl: '/settings'
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error: any) {
        return new NextResponse(`Database Error: ${error.message}`, { status: 500 });
      }
    }

    case "invoice.payment_failed": {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const { userId } = subscription.metadata;

      try {
        // Delete user subscription and API limits if payment failed
        await prismadb.userSubscription.delete({
          where: {
            userId: userId,
          },
        });

        await prismadb.userApiLimit.delete({
          where: {
            userId: userId,
          },
        });

        console.log(`Payment failed for user: ${userId} and their data has been deleted`);

        return new NextResponse(JSON.stringify({
          redirectUrl: '/settings'
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error: any) {
        return new NextResponse(`Failed Payment Handling Error: ${error.message}`, { status: 200 });
      }
    }

    case "customer.subscription.deleted": {
      console.log("inside delete subsription :"+ JSON.stringify(event.data.object));
      const subscription = event.data.object as Stripe.Subscription;

      const { userId } = subscription.metadata;

      try {
        // Delete the user's subscription and API limit on subscription deletion
        await prismadb.userSubscription.delete({
          where: {
            userId: userId,
          },
        });

        await prismadb.userApiLimit.delete({
          where: {
            userId: userId,
          },
        });

        console.log(`Subscription deleted for user: ${userId} and their data has been deleted`);
        return new NextResponse(JSON.stringify({
          redirectUrl: '/settings'
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error: any) {
        return new NextResponse(`Subscription Deletion Error: ${error.message}`, { status: 200 });
      }
    }

    case "customer.subscription.updated": {
      console.log("inside customer subsciption updated case :");

      const subscription = event.data.object as Stripe.Subscription;
      console.log("Subscription is :", JSON.stringify(subscription, null, 2));

      // Get the price ID from metadata as it represents the intended plan
      const priceId = subscription.metadata.stripePriceId;
      const { userId } = subscription.metadata;

      try {
        // Define email limits for different plans
        

        console.log("Current Price ID:", priceId);
        console.log("Subscription Status:", subscription.status);
        console.log("Cancel at Period End:", subscription.cancel_at_period_end);

        // Get the new limit based on the price ID
        const newLimit = planLimits[priceId] || 15; // Default to free plan limit if price not found
        console.log("Calculated New Limit:", newLimit);

        // Check if subscription is cancelled
        if (subscription.cancel_at_period_end || subscription.status === 'canceled') {
          // Reset to free plan
          await prismadb.userApiLimit.upsert({
            where: {
              userId: userId,
            },
            update: {
              count: newLimit,
              limit: newLimit,
            },
            create: {
              userId: userId,
              count: newLimit,
              limit: newLimit,
            },
          });
          console.log(`Reset API limits to free plan for user: ${userId}`);
        } else {
          // Update to new plan limit
          await prismadb.userApiLimit.upsert({
            where: {
              userId: userId,
            },
            update: {
              count: newLimit,
              limit: newLimit,
            },
            create: {
              userId: userId,
              count: newLimit,
              limit: newLimit,
            },
          });
          console.log(`Updated API limits to ${newLimit} for user: ${userId}`);
        }

        return new NextResponse(JSON.stringify({
          redirectUrl: '/settings'
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error: any) {
        console.error("Error updating API limits:", error);
        return new NextResponse(`Database Error: ${error.message}`, { status: 500 });
      }
    }

    case "refund.created": {

    }


    default:
      console.log(`Unhandled event type: ${event.type}`);
      console.log("Event : "+ JSON.stringify(event,null,2));
  }

  return new NextResponse(null, { status: 200 });
}
