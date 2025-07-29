// components/education-form.tsx
"use client";

import { upsertEducation } from "@/actions/resume-actions";
import { Button } from "./ui/button";

export function EducationForm({
  resumeId,
  onSuccess,
}: {
  resumeId: string;
  onSuccess?: () => void;
}) {
  const handleSubmit = async (formData: FormData) => {
    await upsertEducation(formData);
    if (onSuccess) onSuccess();
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="resumeId" value={resumeId} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#72839E] mb-1">
            Institution *
          </label>
          <input
            name="institution"
            type="text"
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
            className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
          />
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

      <Button
        variant="outline"
        className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
      >
        Add Education
      </Button>
    </form>
  );
}
