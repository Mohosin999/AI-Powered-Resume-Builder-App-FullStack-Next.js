"use client";

import { useEffect, useState } from "react";
import { createSkill, getResumeById } from "@/actions/resume-actions";
import { generatePrompt } from "@/utils/generate-prompt";
import { toast } from "react-toastify";
import LoadingButton from "./ui/loading-button";
import TextInput from "./ui/text-input";

export function SkillForm({ resumeId }: { resumeId: string }) {
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

  {
    /*=====================================================================
  =   Auto generate suggestions from AI on the first visit and store it
  inside local storage   =
  ======================================================================*/
  }
  useEffect(() => {
    const fetchSuggestions = async () => {
      // Check if suggestions are already cached
      const cached = localStorage.getItem(`skills-${resumeId}`);
      if (cached) {
        setSuggestions(JSON.parse(cached));
        return;
      }

      // Get the resume to get the title
      const resume = await getResumeById(resumeId);

      if (!resume || !resume.title) {
        console.warn("Resume not found or missing title");
        return;
      }

      setAiGenerating(true);
      // Generate prompt based on the resume title
      const prompt = generatePrompt("skills", resume.title);

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data?.result) {
        const skillsArray = data.result
          .split(",")
          .map((skill: string) => skill.trim());

        setSuggestions(skillsArray);
        // Cache the suggestions
        localStorage.setItem(`skills-${resumeId}`, JSON.stringify(skillsArray));
      }

      setAiGenerating(false);
    };

    fetchSuggestions();
  }, [resumeId]);
  {
    /*=========================== End of useEffect ===========================*/
  }

  /**
   * Handles form submission
   * Creates skills
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);

      // Create skill
      await createSkill(formData);

      setSkillInput("");
      toast.success("Skill added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hidden resume ID */}
      <input type="hidden" name="resumeId" value={resumeId} />

      {/* Skill name */}
      <div>
        <label className="label">Skill Name *</label>
        <TextInput
          name="name"
          id="name"
          placeholder="JavaScript"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          required
        />
      </div>

      {/* Suggestion buttons */}
      <div className="flex flex-wrap gap-2">
        {aiGenerating ? (
          <p className="text-sm text-gray-500">Generating suggestions...</p>
        ) : (
          suggestions.map((skill, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setSkillInput(skill)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded-md hover:bg-emerald-500 transition-all active:scale-105 cursor-pointer"
            >
              {skill}
            </button>
          ))
        )}
      </div>

      {/* Add skill button */}
      <LoadingButton loading={loading} loadingText="Adding" title="Add Skill" />
    </form>
  );
}
