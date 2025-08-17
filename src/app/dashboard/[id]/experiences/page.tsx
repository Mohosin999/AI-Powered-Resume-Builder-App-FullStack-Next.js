import type { Metadata } from "next";
import { getExperiences } from "@/actions/resume-actions";
import ExperiencePageClient from "./experience-page-client";
import GoToTop from "@/components/go-to-top";

// Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  return {
    title: `Work Experience | Resume ${id} | AI Resume Builder`,
    description: `Add and manage your professional work experiences for resume ${id}. Create impactful descriptions with AI suggestions.`,
    keywords: [
      "AI Resume Builder",
      "Work Experience",
      "Resume Experience Section",
      "Add Experience",
      "Professional CV Builder",
    ],
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const experiences = await getExperiences(id);

  return (
    <div>
      <ExperiencePageClient experiences={experiences} resumeId={id} />

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
}
