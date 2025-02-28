"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  if (!isLoading) return null;

  return (
    <div className={cn(
      "fixed inset-0 bg-black bg-opacity-90 z-[100] flex flex-col items-center justify-center transition-all duration-300 px-4",
      isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className="text-center">
        <div className="relative w-96 h-96 md:w-16 md:h-16 mx-auto mb-4">
          <Image
            src="/ultimail_logo.png"
            alt="Logo"
            fill
            className=" animate-pulse object-contain"
              // width={520}
              // height={500}
          />
        </div>
        <h2 className="text-white text-lg md:text-xl font-semibold mb-6">
          Loading...
        </h2>
        <div className="w-48 md:w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
}; 