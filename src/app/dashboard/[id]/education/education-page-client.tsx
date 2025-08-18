"use client";

import React, { useState } from "react";
import { deleteEducation, upsertEducation } from "@/actions/resume-actions";
import { EducationFormModal } from "@/components/education-form-modal";
import { EducationForm } from "@/components/education-form";
import PageHeader from "@/components/PageHeader";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Education } from "@/utils/type";
import TextInput from "@/components/ui/text-input";
import LoadingButton from "@/components/ui/loading-button";

interface EducationPageClientProps {
  educations: Education[];
  resumeId: string;
}

const EducationPageClient = ({
  educations,
  resumeId,
}: EducationPageClientProps) => {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Handles form submission
   * Updates education
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);

      // Update education
      await upsertEducation(formData);

      toast.success("Updated education successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update education");
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
   * Confirms the deletion of an education
   */
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto card">
      <PageHeader
        title="Education"
        resumeId={resumeId}
        nextPage="skills"
        showSkip={true}
        showPrevious={true}
        isEditing={isEditing}
      />

      {/*=====================================================================
      =  Show modal button to add education if any exist, otherwise show inline form =
      ======================================================================*/}
      {educations.length > 0 ? (
        <div className="mb-6">
          <EducationFormModal resumeId={resumeId} />
        </div>
      ) : (
        <div className="p-4 lg:p-6 rounded-lg shadow-md mb-0 mt-2 custom-border">
          <h2 className="h2 mb-4">Add New Education</h2>
          <EducationForm resumeId={resumeId} />
        </div>
      )}

      {/*=====================================================================
      =         Render editable forms for each existing education            =
      ======================================================================*/}
      {educations.length > 0 && (
        <div className="space-y-6">
          {educations.map((edu) => (
            <div key={edu.id} className="p-4 lg:p-6 rounded-lg custom-border">
              {/*===============================================================
              =                         Form section                           =
              ===============================================================*/}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden ID & resume ID */}
                <input type="hidden" name="id" value={edu.id} />
                <input type="hidden" name="resumeId" value={resumeId} />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {/* Institution */}
                  <div>
                    <label className="label">Institution *</label>
                    <TextInput
                      name="institution"
                      id="institution"
                      placeholder="University of California, Los Angeles"
                      value={edu.institution}
                      onChange={handleEditStart}
                      required
                    />
                  </div>

                  {/* Degree */}
                  <div>
                    <label className="label">Degree *</label>
                    <TextInput
                      name="degree"
                      id="degree"
                      placeholder="Bachelor"
                      value={edu.degree}
                      onChange={handleEditStart}
                      required
                    />
                  </div>
                </div>

                {/* Field of study */}
                <div>
                  <label className="label">Field of Study</label>
                  <TextInput
                    name="field"
                    id="field"
                    placeholder="Computer Science"
                    value={edu.field || ""}
                    onChange={handleEditStart}
                  />
                </div>

                {/* Start date & end date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Start date */}
                  <div>
                    <label className="label">Start Year *</label>
                    <TextInput
                      name="startDate"
                      id="startDate"
                      placeholder="2020"
                      value={edu.startDate}
                      onChange={handleEditStart}
                      required
                    />
                  </div>

                  {/* End date */}
                  <div>
                    <label className="label">End Year</label>
                    <TextInput
                      name="endDate"
                      id="endDate"
                      placeholder="2025"
                      value={edu.endDate || ""}
                      onChange={handleEditStart}
                    />
                    {/* Checkbox for the current education */}
                    <div className="mt-2 flex items-center">
                      <input
                        id={`current-${edu.id}`}
                        name="current"
                        type="checkbox"
                        defaultChecked={edu.current}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`current-${edu.id}`}
                        className="ml-2 block text-sm text-[#72839E]"
                      >
                        I currently study here
                      </label>
                    </div>
                  </div>
                </div>

                {/* Update & delete buttons */}
                <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-2">
                  {/* Update button */}
                  <LoadingButton
                    loading={loading}
                    loadingText="Updating"
                    title="Update Education"
                  />

                  {/* Delete button */}
                  <Button
                    type="button"
                    onClick={() => confirmDelete(edu.id)}
                    className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white px-4 py-2 rounded-full active:scale-105 cursor-pointer"
                  >
                    Delete Education
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
        deleteAction={deleteEducation}
        description="This will permanently delete the education record from your resume."
      />
    </div>
  );
};

export default EducationPageClient;
