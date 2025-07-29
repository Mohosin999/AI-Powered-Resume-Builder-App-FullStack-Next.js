"use client";

import { createSkill } from "@/actions/resume-actions";
import { Button } from "./ui/button";

export function SkillForm({ resumeId }: { resumeId: string }) {
  const handleSubmit = async (formData: FormData) => {
    await createSkill(formData);
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="resumeId" value={resumeId} />

      <div>
        <label className="block text-sm font-medium text-[#72839E] mb-1">
          Skill Name *
        </label>
        <input
          name="name"
          type="text"
          required
          className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
          placeholder="e.g. JavaScript, React.js, Next.js, Express.js, etc."
        />
      </div>

      <Button
        variant="outline"
        className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
      >
        Add Skill
      </Button>
    </form>
  );
}
