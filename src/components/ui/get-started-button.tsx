"use client";
import { SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  isAuthenticated: boolean;
};

/**
 * GetStartedButton Component
 *
 * This component renders a "Get Started for Free" button.
 * - If the user is authenticated, it navigates them to the dashboard.
 * - If not, it triggers the Clerk SignUp modal.
 *
 * Props:
 * - isAuthenticated (boolean): User's authentication status.
 */
const GetStartedButton = ({ isAuthenticated }: Props) => {
  const router = useRouter();

  /**
   * Handles the click event on the button.
   * - Redirects authenticated users to the dashboard.
   * - Opens the SignUp modal for unauthenticated users.
   */
  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      // Programmatically trigger the hidden SignUpButton
      document.getElementById("sign-in-trigger")?.click();
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={handleClick}
        className="ghost-btn border border-gray-500"
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
