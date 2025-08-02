import SummaryForm from "./summary-form";
import { getPersonalDetails, getSummary } from "@/actions/resume-actions";

interface SummaryPageProps {
  params: {
    id: string;
  };
}

const SummaryPage = async ({ params }: SummaryPageProps) => {
  const summaryInfo = await getSummary(params.id);
  const personalDetails = await getPersonalDetails(params.id);
  const jobTitle = personalDetails?.jobTitle || "Professional";

  return (
    <div className="max-w-4xl mx-auto card-style">
      <SummaryForm
        resumeId={params.id}
        defaultContent={summaryInfo?.content || ""}
        jobTitle={jobTitle}
      />
    </div>
  );
};

export default SummaryPage;
