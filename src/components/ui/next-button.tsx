import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { GrChapterNext } from "react-icons/gr";

interface NextButtonProps {
  id: string;
  pageName: string;
}

const NextButton = ({ id, pageName }: NextButtonProps) => {
  return (
    <Link href={`/dashboard/${id}/${pageName}`}>
      <Button
        variant="outline"
        className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
      >
        Next <GrChapterNext />
      </Button>
    </Link>
  );
};

export default NextButton;
