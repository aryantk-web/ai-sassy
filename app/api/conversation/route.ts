// @ts-nocheck
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import prismadb from "@/lib/prismadb";

import { checkSubscription } from "@/lib/subscription";
import { decreaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages, formData } = body;
    const user = await currentUser();

    console.log("inside /api/conversation endpoint:", { userId, messages, formData });

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!openai.apiKey) {
      return NextResponse.json(
        { error: "OpenAI API Key not configured" },
        { status: 500 }
      );
    }

    if (!messages) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    // First check if user has a valid subscription
    const isPro = await checkSubscription();
    console.log("Subscription status:", { isPro });

    // Only check API limit if user is not a pro subscriber
    if (!isPro) {
      const freeTrial = await checkApiLimit();
      console.log("Free trial status:", { freeTrial });

      if (!freeTrial) {
        return NextResponse.json(
          {
            error: "API_LIMIT_EXCEEDED",
            message: "You have reached the maximum limit of requests. Please upgrade to continue."
          },
          { status: 403 }
        );
      }
    }

    // Fetch the current API limit count for the user
    let userLimit = await prismadb.userApiLimit.findUnique({
      where: {
        userId: userId,
      },
    });
    
    // If no user limit found, create a new entry with 15 counts
    if (!userLimit) {
      console.log("No user limit found, creating a new entry:", userId);
      userLimit = await prismadb.userApiLimit.create({
        data: {
          userId: userId,
          count: 15,
          limit: 15
        }
      });
      console.log("Created new user limit:", JSON.stringify(userLimit));
    }

    // Check if the count exists and is greater than 0
    if (!userLimit || userLimit.count <= 0) {
      console.log("User has reached limit:", userId);
      return NextResponse.json({
        error: "API_LIMIT_EXCEEDED",
        message: "You have reached the maximum limit of requests. Please upgrade to continue."
      }, { 
        status: 403 
      });
    }

    // Simplicity instructions
    const instructions = [
      {
        role: "system",
        content:
          "You are a helpful assistant that writes simple, clear, and concise emails.",
      },
      {
        role: "user",
        content: `Write a simple email with a ${
          messages[1]?.content?.length || "neutral"
        } tone from ${messages[2]?.content} to ${
          messages[3]?.content
        }. The email should be direct, easy to understand, and include the following content: ${
          messages[4]?.content
        }`,
      },
    ];

    const allMessages = [...instructions, ...messages];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: allMessages,
    });

    console.log("OpenAI response:", response);

    await decreaseApiLimit();

    // Store email history
    if (formData) {
      await prismadb.userEmailHistory.create({
        data: {
          userId,
          receiver: formData.receiver,
          content: response.choices[0]?.message?.content || "",
          tone: formData.tone,
          length: formData.length,
        },
      });
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
