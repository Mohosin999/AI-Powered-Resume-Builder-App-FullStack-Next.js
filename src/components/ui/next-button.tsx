import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { GrChapterNext } from "react-icons/gr";

interface NextButtonProps {
  id: string;
  pageName: string;
  disabled?: boolean;
}

const NextButton = ({ id, pageName, disabled = false }: NextButtonProps) => {
  return (
    <Link
      href={disabled ? "#" : `/dashboard/${id}/${pageName}`}
      aria-disabled={disabled}
      onClick={(e) => disabled && e.preventDefault()}
      className={disabled ? "pointer-events-none" : ""}
    >
      <Button
        variant="outline"
        disabled={disabled}
        className={`text-gray-900 ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300"
            : "cursor-pointer hover:bg-emerald-400 hover:border-emerald-400"
        }`}
      >
        Next <GrChapterNext />
      </Button>
    </Link>
  );
};

export default NextButton;
