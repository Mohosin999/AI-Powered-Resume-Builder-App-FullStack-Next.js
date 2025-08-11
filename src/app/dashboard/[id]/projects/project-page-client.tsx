"use client";

import React, { useState } from "react";
import { ProjectFormModal } from "@/components/project-form-modal";
import { PageHeader } from "@/components/PageHeader";
import { deleteProject, upsertProject } from "@/actions/resume-actions";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Project } from "@/utils/type";
import TextInput from "@/components/ui/text-input";
import Textarea from "@/components/ui/text-area";
import LoadingButton from "@/components/ui/loading-button";
import ProjectForm from "@/components/project-form";

interface ProjectPageClientProps {
  projects: Project[];
  resumeId: string;
}

const ProjectPageClient = ({ projects, resumeId }: ProjectPageClientProps) => {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Handles form submission
   * Updates project
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);

      // Update project
      await upsertProject(formData);

      toast.success("Project updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles edit start
   */
  const handleEditStart = () => {
    setIsEditing(true);
  };

  /**
   * Confirms the deletion of a project
   */
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto card">
      <PageHeader
        title="Projects"
        resumeId={resumeId}
        nextPage="education"
        showSkip={true}
        showPrevious={true}
        isEditing={isEditing}
      />

      {/*=====================================================================
      =  Show modal button to add project if any exist, otherwise show inline form =
      ======================================================================*/}
      {projects.length > 0 ? (
        <div className="mb-6">
          <ProjectFormModal resumeId={resumeId} />
        </div>
      ) : (
        <div className="p-4 lg:p-6 rounded-lg shadow-md mb-0 mt-2 custom-border">
          <h2 className="h2 mb-4">Add New Project</h2>
          <ProjectForm resumeId={resumeId} />
        </div>
      )}

      {/*=====================================================================
      =          Render editable forms for each existing project             =
      ======================================================================*/}
      {projects.length > 0 && (
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 lg:p-6 rounded-lg custom-border"
            >
              {/*===============================================================
              =                         Form section                           =
              ===============================================================*/}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden ID & resume ID */}
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="resumeId" value={resumeId} />

                {/* Project name */}
                <div>
                  <label className="label">Project Name *</label>
                  <TextInput
                    name="name"
                    id="name"
                    placeholder="AI Resume Builder App"
                    value={project.name}
                    onChange={handleEditStart}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="label">Description *</label>
                  <Textarea
                    name="description"
                    id="description"
                    value={project.description}
                    onChange={handleEditStart}
                    required
                  />
                </div>

                {/* Live url */}
                <div>
                  <label className="label">Live Url</label>
                  <TextInput
                    type="url"
                    name="url"
                    id="url"
                    placeholder="https://ai-resume-builder.vercel.app/"
                    value={project.url || ""}
                    onChange={handleEditStart}
                  />
                </div>

                {/* Repository url */}
                <div>
                  <label className="label">Repository Url</label>
                  <TextInput
                    type="url"
                    name="repoUrl"
                    id="repoUrl"
                    placeholder="https://ai-resume-builder.vercel.app/"
                    value={project.repoUrl || ""}
                    onChange={handleEditStart}
                  />
                </div>

                {/* Case study url */}
                <div>
                  <label className="label">Case-Study Url</label>
                  <TextInput
                    type="url"
                    name="caseStudyUrl"
                    id="caseStudyUrl"
                    placeholder="https://ai-resume-builder.vercel.app/"
                    value={project.caseStudyUrl || ""}
                    onChange={handleEditStart}
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-2 mt-5">
                  <LoadingButton
                    loading={loading}
                    loadingText="Updating"
                    title="Update Project"
                  />

                  {/* Delete button */}
                  <Button
                    type="button"
                    onClick={() => confirmDelete(project.id)}
                    className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white px-4 py-2 rounded-md active:scale-105 cursor-pointer"
                  >
                    Delete Project
                  </Button>
                </div>
              </form>
              {/*=================== End of form section ====================*/}
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
        deleteAction={deleteProject}
        description="This will permanently delete the project from your resume."
      />
    </div>
  );
};

export default ProjectPageClient;
