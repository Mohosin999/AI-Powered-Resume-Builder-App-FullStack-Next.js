import React from "react";

interface ResumeHeadingProps {
  title: string;
  highlight?: string;
}

const ResumeHeading: React.FC<ResumeHeadingProps> = ({ title, highlight }) => {
  return (
    <h2 className="text-lg font-semibold mt-6 border-b border-gray-600 uppercase">
      {title}
      {highlight && <span className="text-sm">{highlight}</span>}
    </h2>
  );
};

export default ResumeHeading;
