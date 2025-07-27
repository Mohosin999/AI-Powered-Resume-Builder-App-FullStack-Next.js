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
      <Button variant="ghost" className="homepage-button-style">
        Skip
      </Button>
    </Link>
  );
};

export default SkipButton;
