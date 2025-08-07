"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface LoadingButtonProps {
  loading: boolean;
  loadingText: string;
  title: React.ReactNode;
}

const LoadingButton = ({ loading, loadingText, title }: LoadingButtonProps) => {
  return (
    <Button
      type="submit"
      variant="ghost"
      className="ghost-btn-3rd"
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <Loader className="w-4 h-4 animate-spin" />
          {loadingText}
        </div>
      ) : (
        title
      )}
    </Button>
  );
};

export default LoadingButton;
