import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import MobileSidebar from "./mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = async () => { 
    const apiLimitCount = await getApiLimitCount(); 
    const isPro = await checkSubscription(); 
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const UserApiLimit = await prismadb.userApiLimit.findUnique({
        where: { userId },
    });

    return (
        <div className="flex items-center p-4" style={{ backgroundColor: "#1E293B" }}>
            <MobileSidebar userId={UserApiLimit} isPro={isPro} apiLimitCount={apiLimitCount} />
            <div className="flex w-full justify-end gap-x-4">
                
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
};

export default Navbar;
