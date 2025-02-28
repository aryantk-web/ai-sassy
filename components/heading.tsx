import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps { 
    title: string; 
    description: string; 
    icon: LucideIcon; 
    iconColor?: string; 
    bgColor?: string;
    titleClass?: string; // New prop for title class
    descriptionClass?: string; // New prop for description class
}

export const Heading = ({
    title, 
    description, 
    icon: Icon,
    iconColor,
    bgColor,
    titleClass, // Destructure the new prop
}: HeadingProps) => { 
    return (
        <>
        <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
           <div className={cn("bg-p-2 w-fit rounded-md")}>
                <Icon className={cn("w-10 h-10", iconColor)} />
           </div>
           <div>
               <h2 className={cn("text-3xl font-bold", titleClass)}> {/* Apply titleClass here */}
                   {title} 
               </h2>
               <p className="text-sm text-muted-foreground">
                   {description}
               </p>
           </div>
        </div>
        </>
    );
};
