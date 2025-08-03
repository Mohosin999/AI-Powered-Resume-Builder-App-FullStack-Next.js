import { getSkills } from "@/actions/resume-actions";
import SkillPageClient from "./skill-page-client";

export default async function SkillPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const skills = await getSkills(id);

  return <SkillPageClient skills={skills} resumeId={id} />;
}
