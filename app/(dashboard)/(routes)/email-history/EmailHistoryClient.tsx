"use client";

import { useState } from "react";
import { Heading } from "@/components/heading";
import { Mail, Trash2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface EmailHistoryEntry {
  id: string;
  userId: string;
  receiver: string;
  content: string;
  tone: string;
  length: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EmailHistoryClientProps {
  initialEmails: EmailHistoryEntry[];
}

export const EmailHistoryClient = ({ initialEmails }: EmailHistoryClientProps) => {
  const [emails, setEmails] = useState<EmailHistoryEntry[]>(initialEmails);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/email-history/${id}`);
      setEmails(emails.filter(email => email.id !== id));
      toast.success("Email deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete email");
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.delete('/api/email-history');
      setEmails([]);
      toast.success("All emails cleared successfully");
      router.refresh();
    } catch (error) {
      console.error("Clear all error:", error);
      toast.error("Failed to clear emails");
    }
  };

  if (!emails || emails.length === 0) {
    return (
      <div className="flex flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Email History
          </h1>
          <p className="text-lg text-gray-400">
            View and manage your email history
          </p>
        </div>
        <div className="px-4 lg:px-8 mt-4">
          <Card className="p-8">
            <div className="text-center text-gray-500">
              No emails in history
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Email History
        </h1>
        <p className="text-lg text-gray-400">
          View and manage your email history
        </p>
      </div>
      <div className="px-4 lg:px-8 mt-4">
        <div className="flex justify-end mb-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-auto">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear All Email History</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your email history.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAll} className="bg-red-600 hover:bg-red-700">
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {emails.map((email) => (
          <Card key={email.id} className="p-4 my-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold mb-2">To: {email.receiver}</div>
                <div className="text-sm text-gray-500 mb-2">
                  Tone: {email.tone} | Length: {email.length}
                </div>
                <div className="text-sm whitespace-pre-wrap">{email.content}</div>
                <div className="text-xs text-gray-400 mt-2">
                  Created: {email.createdAt.toLocaleString()}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(email.id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
                disabled={deletingId === email.id}
              >
                {deletingId === email.id ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Trash2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
