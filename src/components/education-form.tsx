"use client";

import { upsertEducation } from "@/actions/resume-actions";
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingButton from "./ui/loading-button";
import TextInput from "./ui/text-input";

interface EducationFormProps {
  resumeId: string;
  handleModalClose?: () => void;
}

export function EducationForm({
  resumeId,
  handleModalClose,
}: EducationFormProps) {
  const [loading, setLoading] = useState(false);

  /**
   * Handles form submission
   * Creates education
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);

      // Create education
      await upsertEducation(formData);

      if (handleModalClose) handleModalClose();
      toast.success("Education added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add education");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hidden ID */}
      <input type="hidden" name="resumeId" value={resumeId} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Institution */}
        <div>
          <label className="label">Institution *</label>
          <TextInput
            name="institution"
            id="institution"
            placeholder="University of California, Los Angeles"
            required
          />
        </div>
        {/* Degree  */}
        <div>
          <label className="label">Degree *</label>
          <TextInput
            name="degree"
            id="degree"
            placeholder="Bachelor"
            required
          />
        </div>
      </div>

      {/* Field of study */}
      <div>
        <label className="label">Field of Study</label>
        <TextInput name="field" id="field" placeholder="Computer Science" />
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
            required
          />
        </div>

        {/* End date */}
        <div>
          <label className="label">End Year</label>
          <TextInput name="endDate" id="endDate" placeholder="2025" />
          {/* Checkbox for the current study */}
          <div className="mt-2 flex items-center">
            <input
              id="current-new"
              name="current"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="current-new"
              className="ml-2 block text-sm text-[#72839E]"
            >
              I currently study here
            </label>
          </div>
        </div>
      </div>

      {/* Add button */}
      <div className="flex justify-end">
        <LoadingButton
          loading={loading}
          loadingText="Adding"
          title="Add Education"
        />
      </div>
    </form>
  );
}
