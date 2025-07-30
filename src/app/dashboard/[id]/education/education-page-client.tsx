"use client";

import React, { useState } from "react";
import { deleteEducation, upsertEducation } from "@/actions/resume-actions";
import { EducationFormModal } from "@/components/education-form-modal";
import { EducationForm } from "@/components/education-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { PageHeader } from "@/components/PageHeader";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Button } from "@/components/ui/button";

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
              className="p-6 rounded-lg shadow-md border border-gray-700"
            >
              <form action={upsertEducation} className="space-y-4">
                <input type="hidden" name="id" value={edu.id} />
                <input type="hidden" name="resumeId" value={resumeId} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#72839E] mb-1">
                      Institution *
                    </label>
                    <input
                      name="institution"
                      type="text"
                      defaultValue={edu.institution}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#72839E] mb-1">
                      Degree *
                    </label>
                    <input
                      name="degree"
                      type="text"
                      defaultValue={edu.degree}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#72839E] mb-1">
                    Field of Study
                  </label>
                  <input
                    name="field"
                    type="text"
                    defaultValue={edu.field || ""}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#72839E] mb-1">
                      Start Date *
                    </label>
                    <input
                      name="startDate"
                      type="date"
                      defaultValue={edu.startDate}
                      required
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
                      defaultValue={edu.endDate || ""}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
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

                <div className="flex justify-between">
                  <SubmitButton
                    defaultText="Update Education"
                    pendingText="Updating..."
                    successText="Updated"
                  />

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
