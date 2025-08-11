import { getSkills } from "@/actions/resume-actions";
import SkillPageClient from "./skill-page-client";
import GoToTop from "@/components/go-to-top";

export default async function SkillPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const skills = await getSkills(id);

  return (
    <div>
      <SkillPageClient skills={skills} resumeId={id} />

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
}
