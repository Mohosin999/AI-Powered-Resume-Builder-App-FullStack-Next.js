import { getExperiences } from "@/actions/resume-actions";
import ExperiencePageClient from "./experience-page-client";

export default async function ExperiencePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const experiences = await getExperiences(id);

  return <ExperiencePageClient experiences={experiences} resumeId={id} />;
}
