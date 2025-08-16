import { getPersonalDetails, getSummary } from "@/actions/resume-actions";
import SummaryForm from "./summary-form";
import GoToTop from "@/components/go-to-top";
import type { Metadata } from "next";

// Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  return {
    title: `Edit Resume Summary | Resume ${id} | AI Resume Builder`,
    description: `Create or update the professional summary for your AI-generated resume ${id}. Highlight your skills, experience, and achievements effectively.`,
    keywords: [
      "AI Resume Builder",
      "Edit Resume Summary",
      "Resume Summary Generator",
      "Professional Summary",
      "Online CV Maker",
    ],
  };
}

const SummaryPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

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

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
};

export default SummaryPage;
