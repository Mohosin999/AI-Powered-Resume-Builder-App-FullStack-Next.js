// import NextButton from "@/components/ui/next-button";
// import SkipButton from "@/components/ui/skip-button";

// interface PageHeaderProps {
//   title: string;
//   resumeId: string;
//   nextPage: string;
//   showSkip?: boolean;
//   isEditing?: boolean;
// }

// export function PageHeader({
//   title,
//   resumeId,
//   nextPage,
//   showSkip = false,
//   isEditing = false,
// }: PageHeaderProps) {
//   return (
//     <div className="flex justify-between items-center">
//       <h2 className="h2 mb-6">{title}</h2>

//       <div className="flex items-center gap-3 mb-6">
//         {showSkip && <SkipButton id={resumeId} pageName={nextPage} />}
//         <NextButton id={resumeId} pageName={nextPage} disabled={isEditing} />
//       </div>
//     </div>
//   );
// }

import NextButton from "@/components/ui/next-button";
import SkipButton from "@/components/ui/skip-button";
import PreviousButton from "@/components/ui/previous-button"; // ⬅️ Import new button

interface PageHeaderProps {
  title: string;
  resumeId: string;
  nextPage: string;
  showSkip?: boolean;
  isEditing?: boolean;
}

export function PageHeader({
  title,
  resumeId,
  nextPage,
  showSkip = false,
  isEditing = false,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="h2 mb-6">{title}</h2>

      <div className="flex items-center gap-3 mb-6">
        {showSkip && <SkipButton id={resumeId} pageName={nextPage} />}
        {showSkip && <PreviousButton />}
        <NextButton id={resumeId} pageName={nextPage} disabled={isEditing} />
      </div>
    </div>
  );
}
