import { getProjects } from "@/actions/resume-actions";
import ProjectPageClient from "./project-page-client";

interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projects = await getProjects(params.id);

  return <ProjectPageClient resumeId={params.id} projects={projects} />;
}
