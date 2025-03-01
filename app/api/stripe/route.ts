import { auth, currentUser} from "@clerk/nextjs/server"; 
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb"; 
import { stripe } from "@/lib/stripe"; 
import { absoluteUrl } from "@/lib/utils"; 
import { stringify } from "querystring";
// import { decreaseApiLimit } from "@/lib/api-limit";
import Stripe from "stripe";

const settingsUrl = absoluteUrl("/settings");
const cancelUrl = absoluteUrl("/settings");

console.log(settingsUrl);

interface RequestBody {
  plan: any; // You can replace 'any' with the actual type of 'plan'
}
interface CustomerDetails {
  name: string;
  email: string;
}
async function createOrRetrieveCustomerWithEmail(details: CustomerDetails): Promise<string> {
  const { email, name } = details;

  console.log("User Email:", email);
  console.log("User Name:", name);

  try {
    
    // Try to find an existing customer by email
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      // Customer exists, return the ID
      return existingCustomers.data[0].id;
    }

    // Customer doesn't exist, create a new one
    const newCustomer = await stripe.customers.create({
      email,
      name,
    });

    return newCustomer.id;
  } catch (error) {
    console.error("[STRIPE_CUSTOMER_ERROR]", error);
    throw new Error("Failed to create or retrieve customer");
  }
}
export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json(); // Parse the request body
  const { plan } = body;

  try {
    const { userId } = auth();
    const user = await currentUser();

    console.log(userId)

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });

    if (userSubscription && userSubscription.stripeCustomerId) { 
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl
      })

      return new NextResponse(JSON.stringify({url: stripeSession.url}))
    }

    if (!plan) {
      return new NextResponse(JSON.stringify({ message: 'Please select a plan' }))
    }
    
    const count = plan.count;
    const stripePriceId = plan.stripePriceId;

    const customerId= await createOrRetrieveCustomerWithEmail({
      email: user.emailAddresses[0].emailAddress,
      name: user.firstName + " " + user.lastName,
    })

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${settingsUrl}?success=true`,
      cancel_url: `${settingsUrl}?canceled=true`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer: customerId,
      allow_promotion_codes: true,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ], 
      metadata: { 
        userId,
        count,
        stripePriceId,
      }
      ,
      subscription_data:{
        metadata: {
          userId,
          count,
          stripePriceId,
        },
      }
    })

    //console.log("NewUser: " + newUser);

    return new NextResponse(JSON.stringify({url: stripeSession.url}))

  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }

}