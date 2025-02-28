"use client";

import { motion } from "framer-motion";
import { Box, Lock, Search, Settings, Sparkles, Mail, User, PenTool, Globe, FileText, Users } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "@/components/ui/loader";
import { ProgressBar } from "@/components/ui/progress-bar";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

export function GlowingEffectDemoSecond() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push("/conversation");
  };

  return (
    <>
      {isLoading && <LoadingOverlay message="Taking you to your dashboard..." />}
      <div className="relative w-screen left-[50%] right-[50%] -mx-[50vw] border-t border-white/50 mb-12" />
      <div className="space-y-12">
        <div className = " flex justify-center align-middle">

          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-12 text-white relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            What Sets Us Apart
          </motion.h2>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          <GridItem
            area=""
            icon={<Mail className="h-10 w-10 text-white" />}
            title="AI-Powered Email Generation"
            description="Draft emails in half the time with our AI engine."
            bottomLine="50% Faster Emails"
          />

          <GridItem
            area=""
            icon={<User className="h-10 w-10 text-white" />}
            title="Sound Like A Human"
            description="AI writes emails that sound professional and natural."
            bottomLine="Human-Like Writing Style"
          />

          <GridItem
            area=""
            icon={<PenTool className="h-10 w-10 text-white" />}
            title="5 Unique Tones"
            description="Choose between different writing styles based on the context."
            bottomLine="Five Distinct Tones"
          />

          <GridItem
            area=""
            icon={<Globe className="h-10 w-10 text-white" />}
            title="Multilingual Support"
            description="Support for various languages for global outreach."
            bottomLine="Write in Multiple Languages"
          />

          <GridItem
            area=""
            icon={<FileText className="h-10 w-10 text-white" />}
            title="Custom Templates"
            description="Create personalized email templates for any scenario."
            bottomLine="Tailored Email Templates"
          />

          <GridItem
            area=""
            icon={<Users className="h-10 w-10 text-white" />}
            title="Collaborative Editing"
            description="Work together on email drafts in real-time with team members."
            bottomLine="Real-Time Collaboration"
          />
        </ul>
        <div className="flex justify-center">
          <button 
            onClick={handleClick}
            className="group relative px-8 py-4 text-lg font-semibold text-white"
            disabled={isLoading}
          >
            <div className="absolute inset-0 rounded-lg border-2 border-gray-700/50 bg-black">
              <GlowingEffect
                blur={0}
                borderWidth={3}
                spread={150}
                glow={true}
                disabled={isLoading}
                proximity={64}
                inactiveZone={0.01}
              />
            </div>
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <Sparkles className="h-5 w-5 hover:text-yellow-200" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bottomLine: string;
}

const GridItem = ({ area, icon, title, description, bottomLine }: GridItemProps) => {
  return (
    <li className="min-h-[14rem] list-none">
      <div className="relative h-full rounded-2.5xl border-2 border-gray-700/50 bg-black p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={130}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border-2 border-gray-700/50 bg-black p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col gap-4">
            <div className="w-fit rounded-lg border border-gray-600 p-3 bg-gray-900">
              {icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold font-sans -tracking-4 md:text-3xl text-balance text-white">
                {title}
              </h3>
              <p className="font-sans text-base md:text-lg text-gray-300">
                {description}
              </p>
            </div>
          </div>
          <div className="border-t-2 border-gray-700/50 pt-4">
            <p className="font-sans text-base font-semibold text-purple-400">
              {bottomLine}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
