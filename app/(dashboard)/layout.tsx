import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => { 
    const apiLimitCount = await getApiLimitCount(); 
    const isPro = await checkSubscription(); 
    const { userId } = auth();
  
    if (!userId) {
        redirect("sign-in");
       
    }
    const UserApiLimit = await prismadb.userApiLimit.findUnique({
            where: { userId },
        });
    // console.log("user Api Limit" , JSON.stringify(UserApiLimit))

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
                <Sidebar userId={UserApiLimit} isPro={isPro} apiLimitCount={apiLimitCount} />
            </div>
            <main className="md:pl-72 ">
                <Navbar />
                {children}
            </main>    
        </div>
    );
}

export default DashboardLayout;