import { FaBrain } from "react-icons/fa";
import { LoaderCircle } from "lucide-react";
import { Button } from "./button";

interface GenerateFromAIButtonProps {
  onclick: () => void;
  loading: boolean;
}

const GenerateFromAIButton = ({
  onclick,
  loading,
}: GenerateFromAIButtonProps) => {
  return (
    <Button
      type="button"
      onClick={onclick}
      disabled={loading}
      className="flex items-center justify-center gap-2 px-4 py-2 mb-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm sm:text-base cursor-pointer"
    >
      {loading ? (
        <>
          <LoaderCircle className="animate-spin w-4 h-4" />
          <span>Generating</span>
        </>
      ) : (
        <>
          <FaBrain className="w-4 h-4" />
          <span>Generate from AI</span>
        </>
      )}
    </Button>
  );
};

export default GenerateFromAIButton;
