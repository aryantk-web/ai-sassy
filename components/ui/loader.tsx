import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "default" | "sm" | "lg";
  className?: string;
}

export const Loader = ({
  size = "default",
  className,
}: LoaderProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div 
        className={cn(
          "animate-spin rounded-full border-t-2 border-white",
          size === "default" && "h-6 w-6 border-2",
          size === "sm" && "h-4 w-4 border-2",
          size === "lg" && "h-8 w-8 border-3",
        )}
      />
    </div>
  );
};
