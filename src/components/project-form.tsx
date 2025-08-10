"use client";

import { upsertProject } from "@/actions/resume-actions";
import { generatePrompt } from "@/utils/generate-prompt";
import { useState } from "react";
import GenerateFromAIButton from "./ui/generate-ai-button";
import { toast } from "react-toastify";
import TextInput from "./ui/text-input";
import LoadingButton from "./ui/loading-button";
import Textarea from "./ui/text-area";

interface ProjectFormProps {
  resumeId: string;
  handleModalClose?: () => void;
}

const ProjectForm = ({ resumeId, handleModalClose }: ProjectFormProps) => {
  const [projectName, setProjectName] = useState("");
  const [content, setContent] = useState<string | null>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Generates project description from AI based on job title
   */
  const handleGenerate = async (projectName: string) => {
    setAiGenerating(true);

    // Generate prompt based on job title
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
    setAiGenerating(false);
  };

  /**
   * Handles form submission
   * Creates project
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);

      // Create project
      await upsertProject(formData);

      if (handleModalClose) handleModalClose();
      toast.success("Project added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hidden ID */}
      <input type="hidden" name="resumeId" value={resumeId} />

      {/* Project Name */}
      <div>
        <label className="label">Project Name *</label>
        <TextInput
          name="name"
          id="name"
          placeholder="AI Resume Builder App"
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <div className="flex justify-between items-end">
          <label htmlFor="content" className="label">
            Description *
          </label>

          {/* Generate from AI Button */}
          <GenerateFromAIButton
            onclick={() => handleGenerate(projectName)}
            loading={aiGenerating}
          />
        </div>

        {/* Textarea */}
        <Textarea
          name="description"
          id="description"
          value={content ?? ""}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      {/* Live url */}
      <div>
        <label className="label">Live Link</label>
        <TextInput
          type="url"
          name="url"
          id="url"
          placeholder="https://ai-resume-builder.vercel.app/"
        />
      </div>

      {/* Repository url */}
      <div>
        <label className="label">Repository Url</label>
        <TextInput
          type="url"
          name="repoUrl"
          id="repoUrl"
          placeholder="https://ai-resume-builder.vercel.app/"
        />
      </div>

      {/* Case study url */}
      <div>
        <label className="label">Case-Study Url</label>
        <TextInput
          type="url"
          name="caseStudyUrl"
          id="caseStudyUrl"
          placeholder="https://ai-resume-builder.vercel.app/"
        />
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <LoadingButton
          loading={loading}
          loadingText="Adding"
          title="Add Project"
        />
      </div>
    </form>
  );
};

export default ProjectForm;
