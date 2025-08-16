import { getPersonalDetails } from "@/actions/resume-actions";
import PersonalDetailsForm from "./personal-details-form";
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
    title: `Edit Personal Details | Resume ${id} | AI Resume Builder`,
    description: `Edit the personal details of your AI-generated resume ${id}. Update your name, job title, contact information, and more for a professional CV.`,
    keywords: [
      "AI Resume Builder",
      "Edit Resume",
      "Update Personal Details",
      "Resume Editor",
      "Professional CV Builder",
    ],
  };
}

export default async function PersonalDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const personalDetails = await getPersonalDetails(id);

  // Default values to prevent uncontrolled/controlled warnings by ensuring fields always have a string.
  const defaultValues = {
    resumeId: id,
    firstName: personalDetails?.firstName || "",
    lastName: personalDetails?.lastName || "",
    email: personalDetails?.email || "",
    jobTitle: personalDetails?.jobTitle || "",
    socialLink: personalDetails?.socialLink || "",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PersonalDetailsForm resumeId={id} personalDetails={defaultValues} />

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
}
