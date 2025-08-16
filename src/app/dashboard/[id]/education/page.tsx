import { getEducations } from "@/actions/resume-actions";
import EducationPageClient from "./education-page-client";
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
    title: `Education | Resume ${id} | AI Resume Builder`,
    description: `Add and manage your educational background for resume ${id}. Showcase your academic achievements and qualifications with AI formatting.`,
    keywords: [
      "AI Resume Builder",
      "Resume Education",
      "Add Education",
      "Academic Background",
      "Educational Qualifications",
      "Professional CV Builder",
    ],
  };
}

export default async function EducationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const educations = await getEducations(id);

  return (
    <div>
      <EducationPageClient educations={educations} resumeId={id} />

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
}
