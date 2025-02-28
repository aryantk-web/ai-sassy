"use client";

import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button";

import Sidebar from "@/components/sidebar"
import { useEffect, useState } from "react";

interface MobileSidebarProps {
    apiLimitCount: number;
    isPro: boolean;
    userId: any;
}
const MobileSidebar = ({
    apiLimitCount,
    isPro = false,
    userId,
}: MobileSidebarProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar userId={userId} isPro={isPro} apiLimitCount={apiLimitCount} />
            </SheetContent>
        </Sheet>


    );
}

export default MobileSidebar; 
