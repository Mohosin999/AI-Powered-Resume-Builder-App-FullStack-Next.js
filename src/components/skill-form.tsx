"use client";
import { useEffect, useState } from "react";
import { createSkill, getResumeById } from "@/actions/resume-actions";
import { Button } from "./ui/button";
import { generatePrompt } from "@/utils/helper";
import { toast } from "react-toastify";

export function SkillForm({ resumeId }: { resumeId: string }) {
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Auto-generate suggestions on first visit and cache it
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

      // Generate suggestions
      setLoading(true);
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
      setLoading(false);
    };

    fetchSuggestions();
  }, [resumeId]);

  const handleSubmit = async (formData: FormData) => {
    await createSkill(formData);
    setSkillInput("");
    toast.success("Skill Added Successfully!");
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="resumeId" value={resumeId} />

      <div>
        <label className="label-style">Skill Name *</label>
        <input
          name="name"
          type="text"
          required
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="JavaScript, React.js, Express.js, etc."
          className="input-style"
        />
      </div>

      {/* Suggestion buttons */}
      <div className="flex flex-wrap gap-2">
        {loading ? (
          <p className="text-sm text-gray-500">Generating suggestions...</p>
        ) : (
          suggestions.map((skill, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setSkillInput(skill)}
              className="px-3 py-1 bg-gray-700 text-sm text-white rounded-md hover:bg-emerald-500 transition-all active:scale-105 cursor-pointer"
            >
              {skill}
            </button>
          ))
        )}
      </div>

      <Button
        variant="outline"
        className="w-full lg:w-auto text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 active:scale-105 cursor-pointer"
      >
        Add Skill
      </Button>
    </form>
  );
}
