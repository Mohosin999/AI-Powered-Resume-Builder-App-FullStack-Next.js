"use client";

import { SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  isAuthenticated: boolean;
};

const GetStartedButton = ({ isAuthenticated }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      document.getElementById("sign-in-trigger")?.click();
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleClick}
        className="hover:bg-emerald-400 hover:border-emerald-400 active:scale-105 cursor-pointer"
      >
        Get Started for Free <ArrowRight className="ml-2 w-5 h-5" />
      </Button>

      {/* Hidden trigger for SignIn modal */}
      <div className="hidden">
        <SignUpButton mode="modal">
          <button id="sign-in-trigger" />
        </SignUpButton>
      </div>
    </>
  );
};

export default GetStartedButton;
