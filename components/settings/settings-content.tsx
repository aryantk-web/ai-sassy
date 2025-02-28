"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/components/subscription-button";
import { useState } from "react";
import SettingsNavigation from "./settings-navigation";

type User = {
  firstName?: string | null;
  lastName?: string | null;
  emailAddresses?: { emailAddress: string }[];
};

interface SettingsContentProps {
  isPro: boolean;
  user: User | null;
  apiLimitCount: number;
}

const SettingsContent = ({ isPro, user, apiLimitCount }: SettingsContentProps) => {
  const [activeSection, setActiveSection] = useState<string>("account");

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <Card className="p-6">
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
                <p className="text-base">{user?.emailAddresses?.[0]?.emailAddress}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Account Status</label>
                <p className="text-base">Active</p>
              </div>
            </div>
          </Card>
        );
      case "billing":
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
            <Separator className="my-4" />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Current Plan</p>
                  <p className="text-lg font-semibold">{isPro ? "Pro" : "Free"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">API Usage</p>
                  <p className="text-lg font-semibold">{apiLimitCount} requests</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Plan Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    {isPro ? "Unlimited" : "Limited"} API requests
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
                <SubscriptionButton isPro={isPro} />
                {!isPro && (
                  <p className="text-sm text-gray-500 mt-2">
                    Upgrade to Pro for unlimited access and premium features.
                  </p>
                )}
              </div>
            </div>
          </Card>
        );
      case "notifications":
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <Separator className="my-4" />
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Usage Alerts</p>
                  <p className="text-sm text-gray-500">Get notified about API usage</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Product Updates</p>
                  <p className="text-sm text-gray-500">Learn about new features</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        );
      case "security":
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <Separator className="my-4" />
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <div>
                <p className="font-medium mb-2">API Keys</p>
                <p className="text-sm text-gray-500 mb-4">Manage your API keys</p>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-mono">••••••••••••••••</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert("API key regeneration functionality will be implemented soon.")}
                  >
                    Regenerate
                  </Button>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Recent Activity</p>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Last login</p>
                    <p className="text-gray-500">Today, 12:42 PM from Windows</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Password changed</p>
                    <p className="text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Sidebar Navigation */}
      <div className="md:col-span-1">
        <SettingsNavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Main Content */}
      <div className="md:col-span-2 space-y-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsContent;
