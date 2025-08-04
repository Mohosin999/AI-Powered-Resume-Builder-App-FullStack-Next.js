"use client";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { SkillForm } from "@/components/skill-form";
import { PageHeader } from "@/components/PageHeader";
import { deleteSkill } from "@/actions/resume-actions";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Skill } from "@/lib/type";

interface SkillPageClientProps {
  skills: Skill[];
  resumeId: string;
}

export default function SkillPageClient({
  skills,
  resumeId,
}: SkillPageClientProps) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleConfirmDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto card-style">
      <PageHeader
        title="Skills"
        resumeId={resumeId}
        nextPage="preview-resume"
      />
      <SkillForm resumeId={resumeId} />

      {skills.length > 0 && (
        <div className="space-y-4 mt-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between px-6 py-3 rounded-lg shadow-md border border-gray-700"
            >
              <h3 className="text-white">{skill.name}</h3>

              <button onClick={() => handleConfirmDelete(skill.id)}>
                <MdDelete className="text-red-500 hover:text-red-600 active:scale-105 cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={open}
        setOpen={setOpen}
        id={deleteId}
        resumeId={resumeId}
        deleteAction={deleteSkill}
        description="This will permanently delete the skill from your resume."
      />
    </div>
  );
}
