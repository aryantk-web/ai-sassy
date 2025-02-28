"use client";

import { Heading } from "@/components/heading";
import { Settings, User, CreditCard, Bell, Shield, HelpCircle, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { SubscriptionButton } from "@/components/subscription-button";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "@/components/ui/loader";
import { FreeCounter } from "@/components/free-counter";
import { ProModal } from "@/components/pro-modal";


interface SettingsClientProps {
  isPro: boolean;
  apiLimitCount: number;
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    emailAddresses: Array<{
      emailAddress: string;
      id: string;
    }>;
    imageUrl: string;
  } | null;
  limit: number;
}

const SettingsClient = ({ isPro, apiLimitCount, user, limit }: SettingsClientProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const proModal = useProModal();


  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onManageSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stripe", {
        plan: {
          stripePriceId: process.env.NEXT_PUBLIC_PREMIUM // or whatever plan they're currently on
        }
      });

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ProModal />
      {(isLoading || loading) && <LoadingOverlay message="Updating settings..." />}
      <div className="container mx-auto py-8 px-4 max-w-7xl space-y-8 bg-[#1E293B]">
        <div className="text-center mb-12">
          {/* <Heading
            title="Settings"
            description="Manage account settings and preferences"
            icon={Settings}
            iconColor="text-white"
            bgColor="bg-gray-700/10"
            titleClass="text-5xl font-extrabold text-white mb-4 flex justify-center"
            descriptionClass="text-lg text-gray-400 flex justify-center"
          /> */}
          <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8 justify-center">
            <div className={"bg-p-2 w-fit rounded-md"}>
              <Settings className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-5xl font-extrabold text-white mb-4 flex justify-center"> {/* Apply titleClass here */}
                Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Information */}
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Account Information</h2>
              <Badge variant={isPro ? "default" : "secondary"}>
                {isPro ? "Pro Plan" : "Free Plan"}
              </Badge>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-base">{user?.firstName} {user?.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <p className="text-base">{user?.emailAddresses[0]?.emailAddress}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Account Status</label>
                <p className="text-base">Active</p>
              </div>
            </div>
          </Card>

          {/* Subscription Details Card */}
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Subscription Details</h2>
              <Shield className="h-6 w-6 text-gray-400" />
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className=" mx-3">
                  <p className="font-medium">Plan</p>
                  <p className="text-sm text-gray-500">{isPro ? "Pro Plan" : "Free Plan"}</p>
                </div>

              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Current Plan</p>
                  <p className="text-lg font-semibold">{isPro ? "Pro" : "Free"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Remaining</p>
                  <p className="text-lg font-semibold">{apiLimitCount} requests</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Plan Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    {isPro ? limit : "Limited"} API requests
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    Priority support
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    Advanced features
                  </li>
                </ul>
              </div>

              <div>
                {!isPro ? (
                  <Button
                    onClick={proModal.onOpen}
                    className="w-full mb-4"
                    variant="premium"
                  >
                    Upgrade to Pro
                    <Zap className="w-4 h-4 ml-2 fill-white" />
                  </Button>
                ) : (
                  <Button
                    onClick={onManageSubscription}
                    className="w-full mb-4"
                    variant="default"
                  >
                    Manage Subscription
                  </Button>
                )}
                {/* <FreeCounter
                  limit={15}
                  isPro={isPro}
                  apiLimitCount={apiLimitCount}
                /> */}
                {!isPro && (
                  <p className="text-sm text-gray-500 mt-2">
                    Upgrade to Pro for unlimited access and premium features.
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Need Help?</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Contact our support team for assistance with your account.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SettingsClient;
