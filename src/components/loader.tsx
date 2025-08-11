import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex justify-center items-center gap-2 h-[100vh] ">
      <div className="flex justify-center items-center gap-2 animate-pulse">
        <Image src="/logo.png" alt="AI Resume Logo" width={40} height={40} />
        <span className="text-emerald-500 text-xl font-semibold tracking-wide">
          AI Resume Builder
        </span>
      </div>
    </div>
  );
}
