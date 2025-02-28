import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { emailId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the email exists and belongs to the user
    const email = await prismadb.userEmailHistory.findFirst({
      where: {
        id: params.emailId,
        userId: userId,
      },
    });

    if (!email) {
      return new NextResponse("Email not found", { status: 404 });
    }

    // Delete the email
    await prismadb.userEmailHistory.delete({
      where: {
        id: params.emailId,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("[EMAIL_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
