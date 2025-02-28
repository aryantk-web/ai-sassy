import { auth } from "@clerk/nextjs/server";
import ConversationClient from "./ConversionClient";
import prismadb from "@/lib/prismadb";
// import { LoadingOverlay } from "@/components/ui/loading-overlay";
// import { useState } from 'react';

const ConversationPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  return (
    <ConversationClient userSubscription={userSubscription} />
  );
};

export default ConversationPage;