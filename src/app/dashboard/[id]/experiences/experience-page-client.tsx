"use client";

import React, { useState } from "react";
import { deleteExperience, upsertExperience } from "@/actions/resume-actions";
import { ExperienceFormModal } from "@/components/experience-form-modal";
import { ExperienceForm } from "@/components/experience-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { PageHeader } from "@/components/PageHeader";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Button } from "@/components/ui/button";

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description: string;
}

interface ExperiencePageClientProps {
  experiences: Experience[];
  resumeId: string;
}

export default function ExperiencePageClient({
  experiences,
  resumeId,
}: ExperiencePageClientProps) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto card-style">
      <PageHeader
        title="Work Experiences"
        resumeId={resumeId}
        nextPage="projects"
        showSkip={true}
      />

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

      {experiences.length > 0 && (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-lg shadow-md border border-gray-700"
            >
              <form action={upsertExperience} className="space-y-4">
                <input type="hidden" name="id" value={exp.id} />
                <input type="hidden" name="resumeId" value={resumeId} />

                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div>
                      <label className="block text-sm font-medium text-[#72839E] mb-1">
                        Job Title *
                      </label>
                      <input
                        name="jobTitle"
                        type="text"
                        defaultValue={exp.jobTitle}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#72839E] mb-1">
                        Company *
                      </label>
                      <input
                        name="company"
                        type="text"
                        defaultValue={exp.company}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#72839E] mb-1">
                    Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    defaultValue={exp.location || ""}
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
                      defaultValue={exp.startDate}
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
                      defaultValue={exp.endDate || ""}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                    />
                    <div className="mt-2 flex items-center">
                      <input
                        id={`current-${exp.id}`}
                        name="current"
                        type="checkbox"
                        defaultChecked={exp.current}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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

                <div>
                  <label className="block text-sm font-medium text-[#72839E] mb-1">
                    Description *
                  </label>

                  <textarea
                    name="description"
                    rows={5}
                    defaultValue={exp.description}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                  />
                </div>

                <div className="flex justify-between">
                  <SubmitButton
                    defaultText="Update Experience"
                    pendingText="Updating..."
                    successText="Updated"
                  />

                  <Button
                    type="button"
                    onClick={() => confirmDelete(exp.id)}
                    className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
                  >
                    Delete Experience
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
        deleteAction={deleteExperience}
        description="This will permanently delete the experience from your resume."
      />
    </div>
  );
}
