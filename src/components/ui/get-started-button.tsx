"use client";

import { SignUpButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const GetStartedButton = () => {
  const { userId } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (userId) {
      router.push("/dashboard");
    } else {
      // Programmatically trigger the hidden SignUpButton
      document.getElementById("sign-in-trigger")?.click();
    }
  };

  return (
    <>
      <Button variant="ghost" onClick={handleClick} className="ghost-btn-3rd">
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
