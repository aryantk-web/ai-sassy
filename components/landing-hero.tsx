"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import MiniForm from '@/components/miniform'; // Import the MiniForm component

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative w-full bg-black py-[4rem]"> {/* Added padding-top */}
      <div className="absolute inset-0">
        {/* Top Triangle Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500" />
        {/* Bottom Triangle Black */}
        <div className="absolute inset-0 bg-black" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-12 text-white font-bold font-poppins">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-8 flex-1 md:flex-[1.7] lg:flex-[2] text-center md:text-left md:mt-[-6rem]">
          <div className="sm:text-5xl md:text-6xl lg:text-6xl 2xl:text-7xl font-extrabold space-y-4">
            <h1>Write Emails Faster with AI</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              <TypewriterComponent
                options={{
                  strings: [
                    "Craft Perfect Emails.",
                    "Personalize in Seconds.",
                    "Save Time.", "Stay Professional."
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: '|'
                }}
              />
            </div>
          </div>

          <div className="sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-light text-gray-400">
            AI-powered tools that write, edit, and optimize emails for you.
          </div>

          {!isSignedIn && (
            <div>
              <Link href="/dashboard">
                <Button variant="premium" className="md:text-lg py-3 px-6 md:py-4 md:px-8 rounded-full font-semibold transition-transform transform hover:scale-105">
                  Start Writing with AI
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-center justify-center flex-1 md:flex-1 lg:flex-1 mt-10 md:mt-0 md:pl-10">
          <div className="text-2xl font-bold text-white mb-4 text-center">Next-Gen AI Email Generator</div>
          <MiniForm className="w-full md:max-w-4xl" />
        </div>
      </div>
    </div>
  );
};
