import { Loader as LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/20"
      style={{ backdropFilter: "blur(1px)" }}
    >
      <div className="flex justify-center items-center gap-2">
        <LoaderIcon className="w-8 h-8 animate-spin" />
        <span className="text-[#005689] dark:text-[#007cb9] text-2xl font-semibold tracking-wide">
          resumia
        </span>
      </div>
    </div>
  );
};

export default Loader;
