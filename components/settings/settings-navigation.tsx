"use client";

import { User, CreditCard, Bell, Shield, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SettingsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SettingsNavigation = ({ activeSection, onSectionChange }: SettingsNavigationProps) => {
  const navigationItems = [
    { id: "account", icon: User, label: "Account" },
    { id: "billing", icon: CreditCard, label: "Billing" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "security", icon: Shield, label: "Security" },
  ];

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-2 p-2 ${
                  activeSection === item.id
                    ? "bg-gray-100"
                    : "hover:bg-gray-100"
                } rounded-lg cursor-pointer transition-colors duration-200`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">Need Help?</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Contact our support team for assistance with your account.
        </p>
        <Button
          variant="link"
          className="text-xs p-0 h-auto mt-2 text-blue-500"
          onClick={() => window.location.href = "mailto:support@ultimail.ai"}
        >
          Contact Support
        </Button>
      </Card>
    </div>
  );
};

export default SettingsNavigation;
