import Link from "next/link";
import React from "react";
import { Button } from "./button";

interface NextButtonProps {
  id: string;
  pageName: string;
}

const SkipButton = ({ id, pageName }: NextButtonProps) => {
  return (
    <Link href={`/dashboard/${id}/${pageName}`}>
      <Button variant="ghost" className="ghost-btn-2nd">
        Skip
      </Button>
    </Link>
  );
};

export default SkipButton;
