import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { Check, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const pricingPlans = [
  {
    title: 'Basic',
    price: 'Free',
    stripePriceId: null, // No Stripe integration for the free plan
    features: [
      '15 Emails per month',
      '5 GB Storage',
      'Community Support',
      'Basic File Sharing',
    ],
    isPro: false
  },
  {
    title: 'Premium',
    price: '$9.99',
    count: 100,
    stripePriceId: process.env.NEXT_PUBLIC_PREMIUM, // Replace with your actual Stripe Price ID for the Premium plan
    features: [
      '100 Emails per month',
      '50 GB Storage',
      'Priority Email Support',
      'Enhanced File Sharing',
      'File Version History (30 days)',
    ],
    isPro: true,
  },
  {
    title: 'Ultimate',
    price: '$29.99',
    count: 300,
    stripePriceId: process.env.NEXT_PUBLIC_ULTIMATE, // Replace with your actual Stripe Price ID for the Ultimate plan
    features: [
      '300 Emails per month',
      'Unlimited Storage',
      '24/7 Dedicated Support',
      'Advanced File Sharing & Permissions',
      'File Version History (90 days)',
      'Premium Security Features',
    ],
    isPro: true,
  },
];

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async (plan:any) => {
    console.log("inside on subscribe");
    try {
      if (!plan.stripePriceId) {
        throw new Error("Price ID is missing.");
      }

      setLoading(true);
      console.log("Starting subscription process for:", plan.stripePriceId);

      const response = await axios.post(`/api/stripe?plan=${plan.stripePriceId}`,{
        plan
      });
      console.log("Stripe API response:", response.data);

      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No URL returned from the Stripe API.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
  <DialogContent className="max-h-[90vh] overflow-y-auto hide-scrollbar">
    <DialogHeader>
      <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
        <div className="flex items-center gap-x-2 font-bold py-1">
          Upgrade to Genius
          <Badge variant="premium" className="uppercase text-sm py-1">
            pro
          </Badge>
        </div>
      </DialogTitle>
      <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
        {pricingPlans.map((plan, index) => (
          <Card
            key={index}
            className="p-4 border-black/5 flex flex-col items-start justify-between mb-4"
          >
            <div className="flex items-center gap-x-4 mb-2">
              <div className="font-semibold text-lg">{plan.title}</div>
              <div className="text-xl font-bold">{plan.price}</div>
            </div>
            <ul className="text-sm mb-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-zinc-700 mb-1 flex items-center">
                  <Check className="text-primary w-4 h-4 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <DialogFooter className="w-full">
             
              <Button
                disabled={loading}
                onClick={() => plan.stripePriceId && onSubscribe(plan)}
                size="lg"
                variant="premium"
                className="w-full"
              >
                {index === 0 ? "Free Tier": "Upgrade"}
                <Zap className="w-4 h-4 ml-2 fill-white" />
              </Button>
            
          </DialogFooter>
          </Card>
        ))}
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  );
};
