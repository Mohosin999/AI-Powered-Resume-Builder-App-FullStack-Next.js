import { getProjects } from "@/actions/resume-actions";
import ProjectPageClient from "./project-page-client";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const projects = await getProjects(id);

  return <ProjectPageClient resumeId={id} projects={projects} />;
}
