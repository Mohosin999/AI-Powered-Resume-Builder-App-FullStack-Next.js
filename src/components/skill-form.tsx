"use client";
import { useEffect, useState } from "react";
import { createSkill, getResumeById } from "@/actions/resume-actions";
import { Button } from "./ui/button";
import { generatePrompt } from "@/lib/helper";

export function SkillForm({ resumeId }: { resumeId: string }) {
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Auto-generate suggestions on mount
  useEffect(() => {
    const fetchSuggestions = async () => {
      const resume = await getResumeById(resumeId);

      if (!resume || !resume.title) {
        console.warn("Resume not found or missing title");
        return;
      }

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
      }
      setLoading(false);
    };

    fetchSuggestions();
  }, [resumeId]);

  const handleSubmit = async (formData: FormData) => {
    await createSkill(formData);
    setSkillInput("");
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
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
          placeholder="e.g. JavaScript, React.js, Next.js, Express.js, etc."
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
              className="px-3 py-1 bg-gray-700 text-sm text-white rounded-md hover:bg-emerald-500 transition-all cursor-pointer"
            >
              {skill}
            </button>
          ))
        )}
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
