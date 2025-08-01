"use client";
import React, { useState } from "react";
import { deleteEducation, upsertEducation } from "@/actions/resume-actions";
import { EducationFormModal } from "@/components/education-form-modal";
import { EducationForm } from "@/components/education-form";
import { PageHeader } from "@/components/PageHeader";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
}

interface EducationPageClientProps {
  educations: Education[];
  resumeId: string;
}

export default function EducationPageClient({
  educations,
  resumeId,
}: EducationPageClientProps) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    await upsertEducation(formData);
    toast.success("Education Updated Successfully!");
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto card-style">
      <PageHeader
        title="Education"
        resumeId={resumeId}
        nextPage="skills"
        showSkip={true}
      />

      {educations.length > 0 ? (
        <div className="mb-6">
          <EducationFormModal resumeId={resumeId} />
        </div>
      ) : (
        <div className="bg-[#1C2434] p-6 rounded-lg shadow-md mb-0 mt-2 border border-gray-700">
          <h2 className="text-gray-300 text-xl font-semibold mb-4">
            Add New Education
          </h2>
          <EducationForm resumeId={resumeId} />
        </div>
      )}

      {educations.length > 0 && (
        <div className="space-y-6">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="p-4 lg:p-6 rounded-lg shadow-md border border-gray-700"
            >
              <form action={handleSubmit} className="space-y-4">
                <input type="hidden" name="id" value={edu.id} />
                <input type="hidden" name="resumeId" value={resumeId} />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div>
                    <label className="label-style">Institution *</label>
                    <input
                      name="institution"
                      type="text"
                      defaultValue={edu.institution}
                      placeholder="University of California, Los Angeles"
                      required
                      className="input-style"
                    />
                  </div>
                  <div>
                    <label className="label-style">Degree *</label>
                    <input
                      name="degree"
                      type="text"
                      defaultValue={edu.degree}
                      placeholder="Bachelor"
                      required
                      className="input-style"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-style">Field of Study</label>
                  <input
                    name="field"
                    type="text"
                    defaultValue={edu.field || ""}
                    placeholder="Computer Science"
                    className="input-style"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label-style">Start Date *</label>
                    <input
                      name="startDate"
                      type="date"
                      defaultValue={edu.startDate}
                      required
                      className="input-style"
                    />
                  </div>
                  <div>
                    <label className="label-style">End Date</label>
                    <input
                      name="endDate"
                      type="date"
                      defaultValue={edu.endDate || ""}
                      className="input-style"
                    />
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

                <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-2">
                  <Button
                    type="submit"
                    variant="outline"
                    className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
                  >
                    Update Education
                  </Button>

                  <Button
                    type="button"
                    onClick={() => confirmDelete(edu.id)}
                    className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
                  >
                    Delete Education
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
        deleteAction={deleteEducation}
        description="This will permanently delete the education record from your resume."
      />
    </div>
  );
}
