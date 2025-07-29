import { SkillForm } from "@/components/skill-form";
import { PageHeader } from "@/components/PageHeader";
import { getSkills } from "@/actions/resume-actions";

interface SkillPageProps {
  params: {
    id: string;
  };
}

export default async function SkillPage({ params }: SkillPageProps) {
  const skills = await getSkills(params.id);
  console.log("skills", skills);

  return (
    <div className="max-w-4xl mx-auto card-style">
      <PageHeader title="Skills" resumeId={params.id} nextPage="languages" />

      <SkillForm resumeId={params.id} />

      {skills.length > 0 && (
        <div className="space-y-4 mt-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="px-6 py-3 rounded-lg shadow-md border border-gray-700"
            >
              <h3 className="text-white">{skill.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
