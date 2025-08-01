"use client";
import { upsertProject } from "@/actions/resume-actions";
import { Button } from "./ui/button";
import { generatePrompt } from "@/lib/helper";
import { useState } from "react";
import GenerateFromAIButton from "./ui/generate-ai-button";
import { toast } from "react-toastify";

export function ProjectForm({
  resumeId,
  onSuccess,
}: {
  resumeId: string;
  onSuccess?: () => void;
}) {
  const [projectName, setProjectName] = useState<string>("");
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (projectName: string) => {
    setLoading(true);

    const prompt = generatePrompt("project", projectName);
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
    await upsertProject(formData);
    if (onSuccess) onSuccess();

    toast.success("Project Added Successfully!");
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="resumeId" value={resumeId} />

      <div>
        <label className="label-style">Project Name *</label>
        <input
          name="name"
          type="text"
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="AI Resume Builder App"
          required
          className="input-style"
        />
      </div>

      <div>
        <div className="flex justify-between items-end">
          <label htmlFor="content" className="label-style">
            Description *
          </label>

          <GenerateFromAIButton
            onclick={() => handleGenerate(projectName)}
            loading={loading}
          />
        </div>
        <textarea
          name="description"
          rows={7}
          value={content ?? ""}
          onChange={(e) => setContent(e.target.value)}
          required
          className="input-style"
        />
      </div>

      <div>
        <label className="label-style">Live Link</label>
        <input
          name="url"
          type="url"
          placeholder="https://ai-resume-builder.vercel.app/"
          className="input-style"
        />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div> */}

      <Button
        variant="outline"
        className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
      >
        Add Project
      </Button>
    </form>
  );
}
