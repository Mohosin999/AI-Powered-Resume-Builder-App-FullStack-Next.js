import SummaryForm from "./summary-form";
import { getPersonalDetails, getSummary } from "@/actions/resume-actions";

const SummaryPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const summaryInfo = await getSummary(id);
  const personalDetails = await getPersonalDetails(id);
  const jobTitle = personalDetails?.jobTitle || "Professional";

  return (
    <div className="max-w-4xl mx-auto card">
      <SummaryForm
        resumeId={id}
        defaultContent={summaryInfo?.content || ""}
        jobTitle={jobTitle}
      />
    </div>
  );
};

export default SummaryPage;
