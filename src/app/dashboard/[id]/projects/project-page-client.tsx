"use client";
import React, { useState } from "react";
import { ProjectFormModal } from "@/components/project-form-modal";
import { ProjectForm } from "@/components/project-form";
import { PageHeader } from "@/components/PageHeader";
import { deleteProject, upsertProject } from "@/actions/resume-actions";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Project } from "@/lib/type";

interface ProjectPageClientProps {
  projects: Project[];
  resumeId: string;
}

export default function ProjectPageClient({
  projects,
  resumeId,
}: ProjectPageClientProps) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    await upsertProject(formData);
    toast.success("Project Updated Successfully!");
    setIsEditing(false);
  };

  // Add this function to detect when editing starts
  const handleEditStart = () => {
    setIsEditing(true);
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto card-style">
      <PageHeader
        title="Projects"
        resumeId={resumeId}
        nextPage="education"
        showSkip={true}
        isEditing={isEditing}
      />

      {projects.length > 0 ? (
        <div className="mb-6">
          <ProjectFormModal resumeId={resumeId} />
        </div>
      ) : (
        <div className="bg-[#1C2434] p-6 rounded-lg shadow-md mb-0 mt-2 border border-gray-700">
          <h2 className="text-gray-300 text-xl font-semibold mb-4">
            Add New Project
          </h2>
          <ProjectForm resumeId={resumeId} />
        </div>
      )}

      {projects.length > 0 && (
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 lg:p-6 rounded-lg shadow-md border border-gray-700"
            >
              <form
                action={handleSubmit}
                onChange={handleEditStart}
                className="space-y-4"
              >
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="resumeId" value={resumeId} />

                <div>
                  <label className="label-style">Project Name *</label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={project.name}
                    placeholder="AI Resume Builder App"
                    required
                    className="input-style"
                  />
                </div>

                <div>
                  <label className="label-style">Description *</label>
                  <textarea
                    name="description"
                    rows={7}
                    defaultValue={project.description}
                    required
                    className="input-style"
                  />
                </div>

                <div>
                  <label className="label-style">Live Link</label>
                  <input
                    name="url"
                    type="url"
                    defaultValue={project.url || ""}
                    placeholder="https://ai-resume-builder.vercel.app/"
                    className="input-style"
                  />
                </div>

                <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-2 mt-5">
                  <Button
                    type="submit"
                    variant="outline"
                    className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 active:scale-105 cursor-pointer"
                  >
                    Update Project
                  </Button>
                  <Button
                    type="button"
                    onClick={() => confirmDelete(project.id)}
                    className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white px-4 py-2 rounded-md active:scale-105 cursor-pointer"
                  >
                    Delete Project
                  </Button>
                </div>
              </form>
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={open}
        setOpen={setOpen}
        id={deleteId}
        resumeId={resumeId}
        deleteAction={deleteProject}
        description="This will permanently delete the project from your resume."
      />
    </div>
  );
}
