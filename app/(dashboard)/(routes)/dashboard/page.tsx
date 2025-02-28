"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, MessageSquare, History, Edit3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

const tools = [
  {
    label: "Email Writer",
    icon: MessageSquare,
    color: "text-violet-600",
    bgColor: "bg-violet-100",
    href: "/conversation",
  },
  {
    label: "Email History",
    icon: History,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    href: "/email-history"
  },
  {
    label: "Templates",
    icon: Edit3,
    color: "text-green-600",
    bgColor: "bg-green-100",
    href: "/templates",
  },
];

interface EmailEntry {
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [emailHistory, setEmailHistory] = useState<EmailEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem('emailHistory') || '[]') as EmailEntry[];
    const recentEmails = storedEmails.slice(-10); // Get the last 10 emails
    setEmailHistory(recentEmails);
  }, []);

  return (
    <div className="min-h-screen bg-[#1E293B] flex flex-col items-center py-12 px-4">
      {isLoading && <LoadingOverlay message="Loading dashboard..." />}
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Welcome to Ultimail
        </h1>
        <p className="text-lg text-gray-400">
          Discover our cutting-edge tools designed to enhance your email experience.
        </p>
      </div>
      
      {/* Tools Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            onClick={() => router.push(tool.href)}
            className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center p-6"
          >
            <div className={`p-4 mb-4 rounded-full ${tool.bgColor}`}>
              <tool.icon className={`w-12 h-12 ${tool.color}`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {tool.label}
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Click to explore more about {tool.label}.
            </p>
            <ArrowRight className="w-6 h-6 text-gray-500" />
          </Card>
        ))}
      </div>

      {/* Email History Section */}
      {/* <div className="mt-12 w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-white mb-6">Your Created Emails</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {emailHistory.length > 0 ? (
            <ul className="space-y-4">
              {emailHistory.map((email, index) => (
                <li key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">From: {email.sender}</p>
                      <p className="text-lg font-semibold text-gray-800">To: {email.receiver}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition">View Details</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              You have not created any emails yet. Start a new conversation to create your first email.
            </p>
          )}
        </div>
      </div> */}
    </div>
  );
};