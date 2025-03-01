"use client"; 

import React, { useState, useEffect } from 'react';

import { Card, CardContent } from "@/components/ui/card"; 

import { MAX_FREE_COUNTS } from '@/constants';

import { Progress } from "@/components/ui/progress"; 
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { useProModal } from '@/hooks/use-pro-modal';

interface FreeCounterProps { 
    apiLimitCount: number; 
    isPro: boolean; 
    limit: number; 
}; 

export const FreeCounter: React.FC<FreeCounterProps> = ({ 
    apiLimitCount = 0, 
    isPro = false, 
    limit = 15
}) => {
    const proModal = useProModal(); 
    // console.log({
    //     apiLimitCount,
    //     isPro,
    //     limit,
    // })
    const [mounted, setMounted] = useState(false); 

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // console.log("apiLimitCount :"+apiLimitCount+" limit :"+limit)
    // Calculate the percentage based on used count vs total limit
    const remaining = apiLimitCount;
    const used = limit - apiLimitCount;
    let percentage = used <= 0 ? 0: (used / limit) * 100;

    // console.log("remaining :"+remaining +" used :"+used+" percentage :"+percentage)

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {isPro 
                                ? `${used} / ${limit} Emails Remaining`
                                : `${used} / ${limit} Free Generations`
                            }
                        </p>   
                        <Progress 
                            className="h-3"
                            value={isPro ? (remaining / limit) * 100 : percentage}
                        />
                    </div>
                    {!isPro && (
                        <Button onClick={proModal.onOpen} className="w-full" variant="premium">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white" />
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};