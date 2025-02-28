import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId },
  });

  if (!userSubscription) {
    return false;
  }

  // Check if user has a valid subscription
  const isValid = 
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  console.log("Subscription check:", {
    userId,
    hasSubscription: !!userSubscription,
    isValid,
    endDate: userSubscription.stripeCurrentPeriodEnd
  });

  return isValid;
};