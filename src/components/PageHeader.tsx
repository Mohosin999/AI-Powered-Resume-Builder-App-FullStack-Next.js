import NextButton from "@/components/ui/next-button";
import SkipButton from "@/components/ui/skip-button";

interface PageHeaderProps {
  title: string;
  resumeId: string;
  nextPage: string;
  showSkip?: boolean;
}

export function PageHeader({
  title,
  resumeId,
  nextPage,
  showSkip = false,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-gray-100 text-2xl font-bold mb-6">{title}</h1>

      <div className="flex gap-3">
        {showSkip && <SkipButton id={resumeId} pageName={nextPage} />}
        <NextButton id={resumeId} pageName={nextPage} />
      </div>
    </div>
  );
}
