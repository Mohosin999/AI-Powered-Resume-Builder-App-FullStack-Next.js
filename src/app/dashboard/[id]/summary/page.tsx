import { getPersonalDetails, getSummary } from "@/actions/resume-actions";
import SummaryForm from "./summary-form";

const SummaryPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const summaryInfo = await getSummary(id);
  const personalDetails = await getPersonalDetails(id);
  // Get job title from personal details to generate summary
  const jobTitle = personalDetails?.jobTitle || "Professional";

  // Default values to prevent uncontrolled/controlled warnings by ensuring fields always have a string.
  const defaultValues = {
    id: summaryInfo?.id || "",
    resumeId: id,
    content: summaryInfo?.content || "",
  };

  return (
    <div className="max-w-4xl mx-auto card">
      <SummaryForm
        resumeId={id}
        summaryInfo={defaultValues}
        jobTitle={jobTitle}
      />
    </div>
  );
};

export default SummaryPage;
