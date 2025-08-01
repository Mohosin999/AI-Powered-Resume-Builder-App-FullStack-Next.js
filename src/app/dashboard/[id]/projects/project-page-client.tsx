"use client";
import React, { useState } from "react";
import { ProjectFormModal } from "@/components/project-form-modal";
import { ProjectForm } from "@/components/project-form";
import { PageHeader } from "@/components/PageHeader";
import { deleteProject, upsertProject } from "@/actions/resume-actions";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface Project {
  id: string;
  name: string;
  description: string;
  url?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

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

  const handleSubmit = async (formData: FormData) => {
    await upsertProject(formData);
    toast.success("Project Updated Successfully!");
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
              className="p-6 rounded-lg shadow-md border border-gray-700"
            >
              <form action={handleSubmit} className="space-y-4">
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

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#72839E] mb-1">
                      Start Date
                    </label>
                    <input
                      name="startDate"
                      type="date"
                      defaultValue={project.startDate || ""}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#72839E] mb-1">
                      End Date
                    </label>
                    <input
                      name="endDate"
                      type="date"
                      defaultValue={project.endDate || ""}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                    />
                  </div>
                </div> */}

                <div className="flex justify-between">
                  <Button
                    type="submit"
                    variant="outline"
                    className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
                  >
                    Update Project
                  </Button>
                  <Button
                    type="button"
                    onClick={() => confirmDelete(project.id)}
                    className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white px-4 py-2 rounded-md mt-2 cursor-pointer"
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
