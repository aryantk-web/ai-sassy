"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader } from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components/ui/loading-screen";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMemberAreaClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      router.push('/dashboard');
    }, 500);
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <nav className="bg-black fixed w-full z-50 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#startPage" className="flex items-center space-x-3">
            <Image
              src="/ultimail_logo.png"
              alt="Flowbite Logo"
              className=" h-20"
              width={120}
              height={100}
            />
            {/* <span className="self-center text-xl md:text-2xl font-semibold text-white">
              ultimail.ai
            </span> */}
          </a>

          {/* Mobile menu button */}
          <div className="flex md:order-2">
            <Link href="/dashboard" className="hidden md:block" onClick={handleMemberAreaClick}>
              <Button
                variant="premium"
                className="mr-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-4 py-2"
                disabled={isLoading}
              >
                {isSignedIn ? "Dashboard" : "Get started"}
              </Button>
            </Link>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Navigation menu */}
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } md:flex items-center w-full md:w-auto md:order-1 absolute md:relative top-[100%] left-0 right-0 md:top-0 bg-black md:bg-transparent`}
          >
            <ul className="flex flex-col md:flex-row p-4 md:p-0 mt-0 font-medium md:space-x-8 rtl:space-x-reverse">
              <li className="w-full md:w-auto">
                <a
                  href="#product"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 md:py-2 px-3 text-white hover:bg-purple-500 md:hover:bg-transparent md:hover:text-purple-500 rounded transition-colors duration-200"
                >
                  Product
                </a>
              </li>
              <li className="w-full md:w-auto">
                <a
                  href="#pricing"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 md:py-2 px-3 text-white hover:bg-purple-500 md:hover:bg-transparent md:hover:text-purple-500 rounded transition-colors duration-200"
                >
                  Pricing
                </a>
              </li>
              <li className="w-full md:w-auto">
                <a
                  href="#faqs"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 md:py-2 px-3 text-white hover:bg-purple-500 md:hover:bg-transparent md:hover:text-purple-500 rounded transition-colors duration-200"
                >
                  FAQs
                </a>
              </li>
              {/* Mobile-only member area button */}
              <li className="w-full md:hidden mt-4">
                <Link 
                  href="/dashboard" 
                  onClick={handleMemberAreaClick}
                  className="block w-full"
                >
                  <Button
                    variant="premium"
                    className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-4 py-2"
                    disabled={isLoading}
                  >
                    {isSignedIn ? "Dashboard" : "Get started"}
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};