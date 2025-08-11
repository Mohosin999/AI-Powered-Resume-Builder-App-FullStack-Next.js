import { getProjects } from "@/actions/resume-actions";
import ProjectPageClient from "./project-page-client";
import GoToTop from "@/components/go-to-top";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const projects = await getProjects(id);

  return (
    <div>
      <ProjectPageClient resumeId={id} projects={projects} />

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
}
