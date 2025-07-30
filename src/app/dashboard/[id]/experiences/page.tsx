import { getExperiences } from "@/actions/resume-actions";
import ExperiencePageClient from "./experience-page-client";

interface ExperiencePageProps {
  params: {
    id: string;
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const experiences = await getExperiences(params.id);

  return (
    <ExperiencePageClient experiences={experiences} resumeId={params.id} />
  );
}
