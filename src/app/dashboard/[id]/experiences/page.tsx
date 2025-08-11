import { getExperiences } from "@/actions/resume-actions";
import ExperiencePageClient from "./experience-page-client";
import GoToTop from "@/components/go-to-top";

export default async function ExperiencePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const experiences = await getExperiences(id);

  return (
    <div>
      <ExperiencePageClient experiences={experiences} resumeId={id} />

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
}
