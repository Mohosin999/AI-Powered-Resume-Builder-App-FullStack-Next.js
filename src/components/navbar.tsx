"use client";
import { useState } from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ModeToggle from "./mode-toggle";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-[#1C2434] shadow-sm">
      {/* <header className="bg-white dark:bg-[#1C2434] shadow-sm"> */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 active:scale-105">
          <Image
            src="/logo.png"
            alt="AI Resume Logo"
            width={40}
            height={40}
            className="w-6 h-6"
          />
          <span className="text-[#272044] dark:text-amber-50 text-2xl font-semibold tracking-wide">
            resumia
          </span>
        </Link>

        {/*=====================================================================
        =                           Desktop Menu                               =
        =====================================================================*/}
        <div className="hidden md:flex items-center space-x-1">
          {/* Theme Options */}
          <ModeToggle />

          {/* Navigation Links */}
          <SignedIn>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="ghost-btn">
                  Dashboard
                </Button>
              </Link>
              {/* User Button */}
              <div className="active:scale-105 flex items-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="ghost-btn">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="ghost" className="ghost-btn">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
        {/*======================== End of Desktop Menu =====================*/}

        {/*=====================================================================
        =                            Mobile Menu                               =
        =====================================================================*/}
        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <div onClick={toggleMobileMenu} data-testid="mobile-menu-button">
            {isMobileMenuOpen ? (
              <X className="text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="text-gray-700 dark:text-gray-200" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-20 left-0 w-full z-50 flex flex-col items-center text-center md:hidden bg-white dark:bg-[#14202D] text-gray-900 dark:text-white p-4 pb-6 space-y-1"
          >
            {/* Theme Options */}
            <ModeToggle />

            <SignedIn>
              <div className="flex flex-col items-center space-y-4">
                <Link href="/dashboard" onClick={toggleMobileMenu}>
                  <Button variant="ghost" className="ghost-btn">
                    Dashboard
                  </Button>
                </Link>
                {/* User Button */}
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="ghost-btn"
                  onClick={toggleMobileMenu}
                >
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  variant="ghost"
                  className="ghost-btn"
                  onClick={toggleMobileMenu}
                >
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
          </motion.div>
        )}
      </AnimatePresence>
      {/*======================= End of Mobile Menu =======================*/}
    </header>
  );
};

export default Navbar;
