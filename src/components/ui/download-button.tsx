"use client";

import { Button } from "@/components/ui/button";

const DownloadResumeBtn = () => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <Button
      type="submit"
      variant="ghost"
      className={`ghost-btn-3rd`}
      onClick={handleDownload}
    >
      Download Resume
    </Button>
  );
};

export default DownloadResumeBtn;
