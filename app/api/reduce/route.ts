import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

interface RequestBody {
    plan: any; // You can replace 'any' with the actual type of 'plan'
}


export async function POST() { 
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Fetch the current API limit count for the user
        const userLimit = await prismadb.userApiLimit.findUnique({
            where: {
                userId: userId,
            },
        });

        // Check if the count exists and is greater than 0
        if (!userLimit || userLimit.count <= 0) {
            return new NextResponse("API limit exceeded", { status: 403 });
        }

        // Reduce the count by 1, but never go below 0
        const newCount = Math.max(userLimit.count - 1, 0);

        // Update the API limit count in the database
        await prismadb.userApiLimit.upsert({
            where: {
                userId: userId,
            },
            update: {
                count: newCount,
            },
            create: {
                userId: userId,
                count: newCount, // This should always create with a non-negative value
            },
        });

        return new NextResponse(JSON.stringify({ status: true, remainingCount: newCount }));
    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
