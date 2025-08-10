"use client";

import React, { useState } from "react";
import { deleteExperience, upsertExperience } from "@/actions/resume-actions";
import { ExperienceFormModal } from "@/components/experience-form-modal";
import { ExperienceForm } from "@/components/experience-form";
import { PageHeader } from "@/components/PageHeader";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Experience } from "@/utils/type";
import LoadingButton from "@/components/ui/loading-button";
import TextInput from "@/components/ui/text-input";
import Textarea from "@/components/ui/text-area";

interface ExperiencePageClientProps {
  experiences: Experience[];
  resumeId: string;
}

const ExperiencePageClient = ({
  experiences,
  resumeId,
}: ExperiencePageClientProps) => {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Handles form submission
   * Updates experience
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);

      // Upsert experience
      await upsertExperience(formData);

      toast.success("Experience updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update experience");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Confirms the deletion of an experience
   */
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  /**
   * Handles the start of editing an experience
   */
  const handleEditStart = () => {
    setIsEditing(true);
  };

  return (
    <div className="max-w-4xl mx-auto card">
      <PageHeader
        title="Experiences"
        resumeId={resumeId}
        nextPage="projects"
        showSkip={true}
        isEditing={isEditing}
      />

      {/*=====================================================================
      =  Show modal button to add experience if any exist,
      otherwise show inline form =
      ======================================================================*/}
      {experiences.length > 0 ? (
        <div className="mb-6">
          <ExperienceFormModal resumeId={resumeId} />
        </div>
      ) : (
        <div className="bg-[#1C2434] p-6 rounded-lg shadow-md mb-0 mt-2 border border-gray-700">
          <h2 className="text-gray-300 text-xl font-semibold mb-4">
            Add New Experience
          </h2>
          <ExperienceForm resumeId={resumeId} />
        </div>
      )}

      {/*=====================================================================
      =         Render editable forms for each existing experience           =
      ======================================================================*/}
      {experiences.length > 0 && (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-4 lg:p-6 rounded-lg custom-border">
              {/*===============================================================
              =                         Form section                           =
              ===============================================================*/}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden ID & resume ID */}
                <input type="hidden" name="id" value={exp.id} />
                <input type="hidden" name="resumeId" value={resumeId} />

                {/* Job Title - Technologies Used */}
                <div>
                  <label className="label">
                    Job Title - Technologies Used *
                  </label>
                  <TextInput
                    name="jobTitle"
                    id="jobTitle"
                    placeholder="Next.js Developer - Next.js, TypeScript, Prisma etc."
                    value={exp.jobTitle}
                    onChange={handleEditStart}
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="label">Company *</label>
                  <TextInput
                    name="company"
                    id="company"
                    placeholder="Google | Freelance"
                    value={exp.company}
                    onChange={handleEditStart}
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="label">Location</label>
                  <TextInput
                    name="location"
                    id="location"
                    placeholder="San Francisco, USA | Remote"
                    value={exp.location || ""}
                    onChange={handleEditStart}
                    required
                  />
                </div>

                {/* Start date & end date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Start Date *</label>
                    <TextInput
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={exp.startDate || ""}
                      onChange={handleEditStart}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">End Date</label>
                    <TextInput
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={exp.endDate || ""}
                      onChange={handleEditStart}
                    />
                    {/* Checkbox for current job */}
                    <div className="mt-2 flex items-center">
                      <input
                        id={`current-${exp.id}`}
                        name="current"
                        type="checkbox"
                        defaultChecked={exp.current}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        onChange={handleEditStart}
                      />
                      <label
                        htmlFor={`current-${exp.id}`}
                        className="ml-2 block text-sm text-[#72839E]"
                      >
                        I currently work here
                      </label>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="label">Description *</label>
                  <Textarea
                    name="description"
                    id="description"
                    value={exp.description}
                    onChange={handleEditStart}
                    required
                  />
                </div>

                <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-2">
                  {/* Update button */}
                  <LoadingButton
                    loading={loading}
                    loadingText="Updating..."
                    title={"Update Experience"}
                  />

                  {/* Delete button */}
                  <Button
                    type="button"
                    onClick={() => confirmDelete(exp.id)}
                    className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white px-4 py-2 rounded-md active:scale-105 cursor-pointer"
                  >
                    Delete Experience
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
        deleteAction={deleteExperience}
        description="This will permanently delete the experience from your resume."
      />
    </div>
  );
};

export default ExperiencePageClient;
