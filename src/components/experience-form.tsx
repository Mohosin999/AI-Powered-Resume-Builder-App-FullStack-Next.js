"use client";
import { upsertExperience } from "@/actions/resume-actions";
import { Button } from "./ui/button";
import { generatePrompt } from "@/utils/helper";
import { useState } from "react";
import GenerateFromAIButton from "./ui/generate-ai-button";
import { toast } from "react-toastify";

export function ExperienceForm({
  resumeId,
  onSuccess,
}: {
  resumeId: string;
  onSuccess?: () => void;
}) {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (jobTitle: string) => {
    setLoading(true);

    const prompt = generatePrompt("experience", jobTitle);
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (data.result) setContent(data.result);
    setLoading(false);
  };

  const handleSubmit = async (formData: FormData) => {
    await upsertExperience(formData);
    if (onSuccess) onSuccess();

    toast.success("Experience Added Successfully!");
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="resumeId" value={resumeId} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div>
          <label className="label">Job Title - Technologies Used *</label>
          <input
            name="jobTitle"
            type="text"
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Frontend Developer - Next.js, TypeScript, Prisma"
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Company *</label>
          <input
            name="company"
            type="text"
            placeholder="Google | Freelance"
            required
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="label">Location</label>
        <input
          name="location"
          type="text"
          placeholder="San Francisco, USA | Remote"
          className="input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Start Date *</label>
          <input name="startDate" type="date" required className="input" />
        </div>
        <div>
          <label className="label">End Date</label>
          <input name="endDate" type="date" className="input" />
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
              I currently work here
            </label>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end">
          <label htmlFor="content" className="label">
            Description *
          </label>

          <GenerateFromAIButton
            onclick={() => handleGenerate(jobTitle)}
            loading={loading}
          />
        </div>
        <textarea
          name="description"
          rows={7}
          value={content ?? ""}
          onChange={(e) => setContent(e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="flex justify-end">
        <Button variant="ghost" className="ghost-btn-3rd">
          Add Experience
        </Button>
      </div>
    </form>
  );
}
