import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { EmailHistoryClient } from "./EmailHistoryClient";

const EmailHistoryPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const emails = await prismadb.userEmailHistory.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      userId: true,
      receiver: true,
      content: true,
      tone: true,
      length: true,
      createdAt: true,
      updatedAt: true
    }
  });

  console.log("emails are : " + JSON.stringify(emails));

  return (
    <div className="px-4 py-5 md:px-8 md:py-5 lg:px-12 lg:py-6 bg-[#1E293B] min-h-screen">
      <EmailHistoryClient initialEmails={emails} />
    </div>
  );
};

export default EmailHistoryPage;
