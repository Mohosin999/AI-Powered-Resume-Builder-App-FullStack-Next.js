import { getProjects } from "@/actions/resume-actions";
import ProjectPageClient from "./project-page-client";
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
    title: `Projects | Resume ${id} | AI Resume Builder`,
    description: `Add and showcase your projects for resume ${id}. Highlight your achievements and technical skills with AI-powered formatting.`,
    keywords: [
      "AI Resume Builder",
      "Resume Projects",
      "Add Projects",
      "Project Showcase",
      "Portfolio in Resume",
      "Professional CV Builder",
    ],
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const projects = await getProjects(id);

  return (
    <div>
      <ProjectPageClient resumeId={id} projects={projects} />

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
}
