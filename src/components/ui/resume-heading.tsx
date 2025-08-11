import React from "react";

interface ResumeHeadingProps {
  title: string;
  highlight?: string;
}

const ResumeHeading = ({ title, highlight }: ResumeHeadingProps) => {
  return (
    <h2 className="text-900-100 text-lg font-semibold mt-6 border-b border-gray-600 uppercase">
      {title}
      {highlight && <span className="text-sm">{highlight}</span>}
    </h2>
  );
};

export default ResumeHeading;
