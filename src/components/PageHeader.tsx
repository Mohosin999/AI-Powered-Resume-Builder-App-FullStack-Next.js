import NextButton from "@/components/ui/next-button";
import SkipButton from "@/components/ui/skip-button";
import PreviousButton from "@/components/ui/previous-button";

interface PageHeaderProps {
  title: string;
  resumeId: string;
  nextPage: string;
  showSkip?: boolean;
  showPrevious?: boolean;
  isEditing?: boolean;
}

const PageHeader = ({
  title,
  resumeId,
  nextPage,
  showSkip = false,
  isEditing = false,
  showPrevious = false,
}: PageHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="h2 mb-6">{title}</h2>

      <div className="flex items-center gap-3 mb-6">
        {showSkip && <SkipButton id={resumeId} pageName={nextPage} />}
        {showPrevious && <PreviousButton />}
        <NextButton id={resumeId} pageName={nextPage} disabled={isEditing} />
      </div>
    </div>
  );
};

export default PageHeader;
