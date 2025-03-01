import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb"; 
import { MAX_FREE_COUNTS} from "@/constants";

export const decreaseApiLimit = async () => { 
    const { userId } = auth(); 
    if (!userId) { 
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({ 
        where: { 
            userId
        }
    }); 

    if (userApiLimit) { 
        // Only decrease if count is greater than 0
        if (userApiLimit.count > 0) {
            await prismadb.userApiLimit.update({ 
                where: { userId: userId }, 
                data: { count: userApiLimit.count - 1}
            });
        }
    } else { 
        // Create new entry with max free counts
        await prismadb.userApiLimit.create({ 
            data: { 
                userId: userId, 
                count: MAX_FREE_COUNTS,
                limit: MAX_FREE_COUNTS
            }
        }); 
    }
};

export const checkApiLimit = async () => {
    const { userId } = auth();
  
    if (!userId) {
        return false;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: { userId: userId },
    });

    console.log("API limit check:", {
        userId,
        currentCount: userApiLimit?.count || 0,
        maxCount: MAX_FREE_COUNTS
    });

    if (!userApiLimit) {
        return true; // Allow first-time users
    }

    // Return true if user has remaining counts
    return userApiLimit.count > 0;
};

export const getApiLimitCount = async () => {
    const { userId } = auth();

    if (!userId) {
        return 0;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (!userApiLimit) {
        return 0;
    }

    return userApiLimit.count;
};

export const getLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return MAX_FREE_COUNTS;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (!userApiLimit) {
        return MAX_FREE_COUNTS;
    }

    return userApiLimit.limit;
};