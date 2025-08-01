"use client";
import { Button } from "@/components/ui/button";

export function DownloadResumeBtn() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <Button
      type="submit"
      variant="outline"
      className={`text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer`}
      onClick={handleDownload}
    >
      Download Resume
    </Button>
  );
}
