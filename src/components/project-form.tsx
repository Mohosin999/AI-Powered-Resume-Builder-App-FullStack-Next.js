// components/project-form.tsx
"use client";

import { upsertProject } from "@/actions/resume-actions";
import { Button } from "./ui/button";

export function ProjectForm({
  resumeId,
  onSuccess,
}: {
  resumeId: string;
  onSuccess?: () => void;
}) {
  const handleSubmit = async (formData: FormData) => {
    await upsertProject(formData);
    if (onSuccess) onSuccess();
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="resumeId" value={resumeId} />

      <div>
        <label className="block text-sm font-medium text-[#72839E] mb-1">
          Project Name *
        </label>
        <input
          name="name"
          type="text"
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
        </div>
      </div>

      <Button
        variant="outline"
        className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
      >
        Add Project
      </Button>
    </form>
  );
}
