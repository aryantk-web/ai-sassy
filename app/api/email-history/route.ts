import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Delete all emails for the user
    await prismadb.userEmailHistory.deleteMany({
      where: {
        userId: userId,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("[EMAIL_CLEAR_ALL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 