import { getSkills } from "@/actions/resume-actions";
import SkillPageClient from "./skill-page-client";
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
    title: `Skills | Resume ${id} | AI Resume Builder`,
    description: `Add and highlight your key skills for resume ${id}. Showcase your technical and professional abilities with AI-powered guidance.`,
    keywords: [
      "AI Resume Builder",
      "Resume Skills",
      "Add Skills",
      "Technical Skills",
      "Professional Skills",
      "CV Builder",
    ],
  };
}

export default async function SkillPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const skills = await getSkills(id);

  return (
    <div>
      <SkillPageClient skills={skills} resumeId={id} />

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
}
