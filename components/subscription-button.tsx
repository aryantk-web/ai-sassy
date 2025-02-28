"use client";

import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import axios from "axios";
import { useState } from "react";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/stripe", {
          plan: {
            count: 100,
            stripePriceId: process.env.NEXT_PUBLIC_PREMIUM,
          }
        });
        window.location.href = response.data.url;
      } catch (error) {
        console.log("BILLING_ERROR", error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      {loading && <LoadingOverlay message="Redirecting to checkout..." />}
      <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
        {isPro ? "Manage Subscription" : "Upgrade"}
        {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
      </Button>
    </>
  );
};