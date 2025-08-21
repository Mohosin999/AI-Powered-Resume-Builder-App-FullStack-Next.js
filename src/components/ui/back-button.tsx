"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  title: string;
}

const BackButton: React.FC<BackButtonProps> = ({ title }) => {
  const router = useRouter();

  return (
    <span
      onClick={() => router.back()}
      className="text-xs underline cursor-pointer active:scale-105"
    >
      {title}
    </span>
  );
};

export default BackButton;
