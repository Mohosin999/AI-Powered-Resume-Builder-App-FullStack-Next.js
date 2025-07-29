import React from "react";
import { ProjectFormModal } from "@/components/project-form-modal";
import { ProjectForm } from "@/components/project-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { PageHeader } from "@/components/PageHeader";
import {
  deleteProject,
  getProjects,
  upsertProject,
} from "@/actions/resume-actions";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projects = await getProjects(params.id);

  return (
    <div className="max-w-4xl mx-auto card-style">
      <PageHeader
        title="Projects"
        resumeId={params.id}
        nextPage="education"
        showSkip={true}
      />

      {/* Add Project Section */}
      {projects.length > 0 ? (
        <div className="mb-6">
          <ProjectFormModal resumeId={params.id} />
        </div>
      ) : (
        <div className="bg-[#1C2434] p-6 rounded-lg shadow-md mb-0">
          <h2 className="text-gray-300 text-xl font-semibold mb-4">
            Add New Project
          </h2>
          <ProjectForm resumeId={params.id} />
        </div>
      )}

      {/* Projects List */}
      {projects.length > 0 && (
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="p-6 rounded-lg shadow-md">
              <form action={upsertProject} className="space-y-4">
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="resumeId" value={params.id} />

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
                </div>
              </form>

              {/* Separate Delete Form */}
              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
                <SubmitButton
                  defaultText="Delete Project"
                  pendingText="Deleting..."
                  successText="Deleted"
                  className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white hover:text-white mt-3"
                />
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
