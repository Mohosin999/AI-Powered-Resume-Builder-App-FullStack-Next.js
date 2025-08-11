"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { SkillForm } from "@/components/skill-form";
import { PageHeader } from "@/components/PageHeader";
import { deleteSkill } from "@/actions/resume-actions";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Skill } from "@/utils/type";

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

  /**
   * Confirms the deletion of a skill
   */
  const handleConfirmDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto card">
      <PageHeader
        title="Skills"
        resumeId={resumeId}
        nextPage="preview-resume"
        showSkip={true}
        showPrevious={true}
      />

      <SkillForm resumeId={resumeId} />

      {/*=====================================================================
      =                        Display existing skills                       =
      ======================================================================*/}
      {skills.length > 0 && (
        <div className="space-y-5 mt-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between px-4 lg:px-6 py-3 rounded-lg shadow-md custom-border"
            >
              {/* Skill name */}
              <h3 className="text-sm lg:text-base text-gray-700 dark:text-gray-300">
                {skill.name}
              </h3>

              {/* Delete button */}
              <button onClick={() => handleConfirmDelete(skill.id)}>
                <MdDelete
                  className="text-red-500 hover:text-red-600 active:scale-105 cursor-pointer"
                  title="Delete the skill"
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/*=====================================================================
      =                      Delete confirmation dialog                       =
      ======================================================================*/}
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
