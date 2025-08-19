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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-[#1C2434] shadow-sm">
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
          <span className="text-emerald-500 text-xl font-semibold tracking-wide">
            AI Resume Builder
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
      {isMobileMenuOpen && (
        <div className="flex flex-col items-center text-center md:hidden dark:bg-[#14202D] text-white p-4 pb-6 space-y-1">
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
        </div>
      )}
      {/*======================= End of Mobile Menu =======================*/}
    </header>
  );
};

export default Navbar;
