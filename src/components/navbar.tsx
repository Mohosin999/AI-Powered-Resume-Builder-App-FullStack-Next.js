"use client";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-[#14202D] shadow-md">
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
          <span className="text-emerald-400 text-xl font-semibold tracking-wide">
            AI Resume Builder
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="ghost" className="homepage-button-style">
                Dashboard
              </Button>
            </Link>
            <div className="active:scale-105 flex items-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="homepage-button-style">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="outline"
                className="hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
              >
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="text-center md:hidden bg-[#14202D] text-white px-4 py-6 space-y-4">
          <SignedIn>
            <Link href="/dashboard" onClick={toggleMobileMenu}>
              <Button variant="ghost" className="w-full homepage-button-style">
                Dashboard
              </Button>
            </Link>
            <div className="mt-4 active:scale-105">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="w-full homepage-button-style"
                onClick={toggleMobileMenu}
              >
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="outline"
                className="text-gray-900 w-full hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
                onClick={toggleMobileMenu}
              >
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      )}
    </header>
  );
};

export default Navbar;
