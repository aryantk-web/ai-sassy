"use client";

import { Loader } from "./loader";
import { ProgressBar } from "./progress-bar";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

export const LoadingOverlay = ({ 
  message = "Loading your experience...",
  className 
}: LoadingOverlayProps) => {
  return (
    <div className={cn(
      "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4",
      className
    )}>
      <Loader size="lg" className="text-white" />
      <ProgressBar />
      <p className="text-white text-sm">{message}</p>
    </div>
  );
};
