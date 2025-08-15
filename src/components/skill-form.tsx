"use client";

import { useEffect, useRef, useState } from "react";
import { createSkill, getResumeById } from "@/actions/resume-actions";
import { generatePrompt } from "@/utils/generate-prompt";
import { toast } from "react-toastify";
import LoadingButton from "./ui/loading-button";

export function SkillForm({ resumeId }: { resumeId: string }) {
  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const cached = localStorage.getItem(`skills-${resumeId}`);
      if (cached) {
        setSuggestions(JSON.parse(cached));
        return;
      }
      const resume = await getResumeById(resumeId);
      if (!resume || !resume.title) return;

      setAiGenerating(true);
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
        localStorage.setItem(`skills-${resumeId}`, JSON.stringify(skillsArray));
      }
      setAiGenerating(false);
    };

    fetchSuggestions();
  }, [resumeId]);

  /**
   * Handles skill suggestion click
   * Animation and form submission
   */
  const handleSuggestionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    skill: string
  ) => {
    if (!containerRef.current || !inputRef.current) {
      setSkillInput(skill);
      return;
    }

    const buttonRect = e.currentTarget.getBoundingClientRect();
    const inputRect = inputRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Create a floating clone
    const clone = document.createElement("div");
    clone.textContent = skill;
    clone.style.position = "absolute";
    clone.style.left = `${buttonRect.left - containerRect.left}px`;
    clone.style.top = `${buttonRect.top - containerRect.top}px`;
    clone.style.padding = "0.25rem 0.75rem";
    clone.style.background = "#10b981";
    clone.style.color = "white";
    clone.style.borderRadius = "0.375rem";
    clone.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    clone.style.transition = "all 0.5s cubic-bezier(.68,-0.55,.27,1.55)";
    clone.style.zIndex = "1000";

    containerRef.current.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.left = `${inputRect.left - containerRect.left}px`;
      clone.style.top = `${inputRect.top - containerRect.top}px`;
      clone.style.transform = "scale(0.8)";
      clone.style.opacity = "0.3";
    });

    // After animation
    setTimeout(() => {
      setSkillInput(skill);
      clone.remove();
    }, 500);
  };

  /**
   *  Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await createSkill(formData);
      setSkillInput("");
      toast.success("Added skill successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="resumeId" value={resumeId} />

        <div>
          <label className="label">Skill Name *</label>
          <input
            ref={inputRef}
            type="text"
            name="name"
            id="name"
            placeholder="JavaScript"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            required
            className="w-full px-4 py-2 text-sm lg:text-base rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none shadow-md"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {aiGenerating ? (
            <p className="text-sm text-gray-500">Generating suggestions...</p>
          ) : (
            suggestions.map((skill, idx) => (
              <button
                type="button"
                key={idx}
                onClick={(e) => handleSuggestionClick(e, skill)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded-md hover:bg-emerald-500 transition-all active:scale-105 cursor-pointer"
              >
                {skill}
              </button>
            ))
          )}
        </div>

        <LoadingButton
          loading={loading}
          loadingText="Adding"
          title="Add Skill"
        />
      </form>
    </div>
  );
}
