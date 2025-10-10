import { Loader } from "lucide-react";

const LoaderSecond = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="flex justify-center items-center gap-2">
        <Loader data-testid="loader-icon" className="w-8 h-8 animate-spin" />
        <span className="text-[#005689] dark:text-[#007cb9] text-2xl font-semibold tracking-wide">
          resumia
        </span>
      </div>
    </div>
  );
};

export default LoaderSecond;
