"use client";
import { upsertEducation } from "@/actions/resume-actions";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

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

    toast.success("Education Added Successfully!");
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="resumeId" value={resumeId} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label-style">Institution *</label>
          <input
            name="institution"
            type="text"
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
            required
            className="input-style"
          />
        </div>
        <div>
          <label className="label-style">End Date</label>
          <input name="endDate" type="date" className="input-style" />
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
