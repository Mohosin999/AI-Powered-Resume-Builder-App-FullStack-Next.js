import { SkillForm } from "@/components/skill-form";
import { PageHeader } from "@/components/PageHeader";
import { getSkills, deleteSkill } from "@/actions/resume-actions";
import { MdDelete } from "react-icons/md";

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
              className="flex items-center justify-between px-6 py-3 rounded-lg shadow-md border border-gray-700"
            >
              <h3 className="text-white">{skill.name}</h3>

              {/* Delete Skill */}
              <form action={deleteSkill}>
                <input type="hidden" name="id" value={skill.id} />

                <button type="submit">
                  <MdDelete className="text-red-500 hover:text-red-600 cursor-pointer" />
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
