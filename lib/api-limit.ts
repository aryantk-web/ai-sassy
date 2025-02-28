import { auth } from "@clerk/nextjs/server"

import prismadb from "@/lib/prismadb"; 

import { MAX_FREE_COUNTS} from "@/constants";

export const increaseApiLimit = async () => { 
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
    await prismadb.userApiLimit.update({ 
        where: { userId: userId }, 
        data: { count: userApiLimit.count + 1}
    });
} else { 
    await prismadb.userApiLimit.create({ 
        data: { userId: userId, count: 1}
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
    })

    console.log("API limit check:", {
        userId,
        currentCount: userApiLimit?.count || 0,
        maxCount: MAX_FREE_COUNTS
    });

    if (!userApiLimit) {
        return true;
    }

    return userApiLimit.count < MAX_FREE_COUNTS;
};

export const getApiLimitCount = async () => { 
    const { userId } = auth(); 

    if (!userId) { 
        return 0
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({ 
     where: { 
        userId
     }
    }); 

    if (!userApiLimit) { 
        return 0
    }
    return userApiLimit.count;
}

export const getLimit = async () => { 
    const { userId } = auth(); 

    if (!userId) { 
        return 0
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({ 
     where: { 
        userId
     }
    }); 

    if (!userApiLimit) { 
        return 15
    }
    return userApiLimit.limit;
}