"use client";
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
        variant="ghost"
        disabled={disabled}
        className={`${
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300"
            : "ghost-btn-3rd"
        }`}
      >
        Next <GrChapterNext />
      </Button>
    </Link>
  );
};

export default NextButton;
