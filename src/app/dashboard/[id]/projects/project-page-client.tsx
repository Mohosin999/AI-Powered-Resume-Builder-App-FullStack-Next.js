"use client";

import React, { useState } from "react";
import { ProjectFormModal } from "@/components/project-form-modal";
import { ProjectForm } from "@/components/project-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { PageHeader } from "@/components/PageHeader";
import { deleteProject, upsertProject } from "@/actions/resume-actions";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";

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
        <div className="bg-[#1C2434] p-6 rounded-lg shadow-md mb-0">
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
              <form action={upsertProject} className="space-y-4">
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="resumeId" value={resumeId} />

                <div>
                  <label className="block text-sm font-medium text-[#72839E] mb-1">
                    Project Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={project.name}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#72839E] mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    defaultValue={project.description}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#72839E] mb-1">
                    URL
                  </label>
                  <input
                    name="url"
                    type="url"
                    defaultValue={project.url || ""}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="flex justify-between">
                  <SubmitButton
                    defaultText="Update Project"
                    pendingText="Updating..."
                    successText="Updated"
                  />
                  <button
                    type="button"
                    onClick={() => confirmDelete(project.id)}
                    className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white px-4 py-2 rounded-md mt-2"
                  >
                    Delete Project
                  </button>
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
