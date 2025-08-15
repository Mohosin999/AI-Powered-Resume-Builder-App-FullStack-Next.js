import { Loader as LoaderIcon } from "lucide-react";

export default function Loader() {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/20"
      style={{ backdropFilter: "blur(1px)" }}
    >
      <div className="flex justify-center items-center gap-2">
        <LoaderIcon className="w-4 h-4 animate-spin" />
        <span className="text-emerald-500 text-lg font-semibold tracking-wide">
          AI Resume Builder
        </span>
      </div>
    </div>
  );
}
