import { getSkills } from "@/actions/resume-actions";
import SkillPageClient from "./skill-page-client";

interface SkillPageProps {
  params: {
    id: string;
  };
}

export default async function SkillPage({ params }: SkillPageProps) {
  const skills = await getSkills(params.id);

  return <SkillPageClient skills={skills} resumeId={params.id} />;
}
