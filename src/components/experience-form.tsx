"use client";

import { generatePrompt } from "@/utils/generate-prompt";
import { useState } from "react";
import GenerateFromAIButton from "./ui/generate-ai-button";
import { toast } from "react-toastify";
import { upsertExperience } from "@/actions/resume-actions";
import LoadingButton from "./ui/loading-button";
import TextInput from "./ui/text-input";
import Textarea from "./ui/text-area";

interface ExperienceFormProps {
  resumeId: string;
  handleModalClose?: () => void;
}

export function ExperienceForm({
  resumeId,
  handleModalClose,
}: ExperienceFormProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [content, setContent] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Generates experience description from AI based on job title
   */
  const handleGenerate = async (jobTitle: string) => {
    setAiGenerating(true);

    // Generate prompt based on job title
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
    setAiGenerating(false);
  };

  /**
   * Handles form submission
   * Creates experience
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);

      // Create experience
      await upsertExperience(formData);

      if (handleModalClose) handleModalClose();
      toast.success("Experience Added Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add experience");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hidden resume ID */}
      <input type="hidden" name="resumeId" value={resumeId} />

      {/* Job title - technologies used */}
      <div>
        <label className="label">Job Title - Technologies Used *</label>
        <TextInput
          name="jobTitle"
          id="jobTitle"
          placeholder="Next.js Developer - Next.js, TypeScript, Prisma etc."
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
      </div>

      {/* Company */}
      <div>
        <label className="label">Company *</label>
        <TextInput
          name="company"
          id="company"
          placeholder="Google | Freelance"
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="label">Location</label>
        <TextInput
          name="location"
          id="location"
          placeholder="San Francisco, USA | Remote"
        />
      </div>

      {/* Start and end date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Start Year *</label>
          <TextInput
            name="startDate"
            id="startDate"
            placeholder="2024"
            required
          />
        </div>
        <div>
          <label className="label">End Year</label>
          <TextInput name="endDate" id="endDate" placeholder="2025" />
          {/* Checkbox for current job */}
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

      {/* Description */}
      <div>
        <div className="flex justify-between items-end">
          <label htmlFor="content" className="label">
            Description *
          </label>

          {/* Generate from AI button */}
          <GenerateFromAIButton
            onclick={() => handleGenerate(jobTitle)}
            loading={aiGenerating}
          />
        </div>

        <Textarea
          name="description"
          id="description"
          value={content ?? ""}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <LoadingButton
          loading={loading}
          loadingText="Adding"
          title="Add Experience"
        />
      </div>
    </form>
  );
}
