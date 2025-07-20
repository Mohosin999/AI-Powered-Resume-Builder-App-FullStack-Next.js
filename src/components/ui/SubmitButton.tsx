"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  pendingText?: string;
  defaultText?: string;
  className?: string;
}

export function SubmitButton({
  pendingText = "Submitting...",
  defaultText = "Submit",
  className = " ",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`cursor-pointer ${className}`}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {pendingText}
        </>
      ) : (
        <>{defaultText}</>
      )}
    </Button>
  );
}
