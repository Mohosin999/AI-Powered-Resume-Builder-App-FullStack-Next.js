"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { GrChapterPrevious } from "react-icons/gr";
import { Button } from "./button";

const PreviousButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="ghost-btn-3rd"
      onClick={() => router.back()}
    >
      <GrChapterPrevious />
    </Button>
  );
};

export default PreviousButton;
