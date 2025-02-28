"use client";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Code, ImageIcon, LayoutDashboard, MessagesSquare, Music, Settings, VideoIcon, Mail, FileText } from "lucide-react"; // Import necessary icons
import { ArrowRight, MessageSquare, History, Edit3 } from "lucide-react";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FreeCounter } from "./free-counter";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Email Writer",
        icon: MessagesSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Email History",  // New Email History Route
        icon: History,
        href: "/email-history",
        color: "text-blue-500"
    },
    {
        label: "Templates",  // New Templates Route
        icon: Edit3,
        href: "/templates",
        color: "text-green-500"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    }
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
    userId: any;
};

const Sidebar = ({
    apiLimitCount = 0,
    userId,
    isPro = false,
}: SidebarProps) => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#1E293B] border-r-[1px] text-white">
            <div className="px-3 py-2 flex-1">
                <div className=" flex items-center justify-center mb-8">
                    <Link href="/dashboard">
                        <div className="relative w-36 h-28">
                            <Image fill alt="Logo" src="/ultimail_logo.png" />
                        </div>
                    </Link>
                </div>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter
                limit={userId?.limit}
                isPro={isPro}
                apiLimitCount={apiLimitCount}
            />
        </div>
    );
}

export default Sidebar;
