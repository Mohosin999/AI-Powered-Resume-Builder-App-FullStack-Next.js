import { auth } from "@clerk/nextjs/server";
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
import { syncUser } from "@/actions/user-actions";

const Navbar = async () => {
  const { userId } = await auth();

  if (userId) {
    await syncUser();
  }

  return (
    <header className="bg-[#14202D] shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Left: Logo + Text */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="AI Resume Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-emerald-400 text-xl font-bold tracking-wide">
            AI Resume Builder
          </span>
        </Link>

        {/* Right: Auth Buttons or Dashboard + User */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="sm"
                className="text-white border border-white"
              >
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Register</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
