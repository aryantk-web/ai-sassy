"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  className?: string;
}

export const ProgressBar = ({ className }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 90);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={cn("w-64 h-2 bg-gray-700 rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-white transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
