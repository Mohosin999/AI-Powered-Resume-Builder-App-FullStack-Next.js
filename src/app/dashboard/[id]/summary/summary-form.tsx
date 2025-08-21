"use client";

import { useEffect, useRef, useState } from "react";
// import GenerateFromAIButton from "@/components/ui/generate-ai-button";
import { generatePrompt } from "@/utils/generate-prompt";
import { toast } from "react-toastify";
// import PageHeader from "@/components/PageHeader";
// import LoadingButton from "@/components/ui/loading-button";
import { Summary } from "@/utils/type";
import { upsertSummary } from "@/actions/resume-actions";
// import Textarea from "@/components/ui/text-area";
import dynamic from "next/dynamic";

// Lazy-loaded components
const GenerateFromAIButton = dynamic(
  () => import("@/components/ui/generate-ai-button")
);
const PageHeader = dynamic(() => import("@/components/PageHeader"));
const LoadingButton = dynamic(() => import("@/components/ui/loading-button"));
const Textarea = dynamic(() => import("@/components/ui/text-area"));

interface SummaryFormProps {
  resumeId: string;
  summaryInfo: Summary;
  jobTitle: string;
}

const SummaryForm = ({ resumeId, summaryInfo, jobTitle }: SummaryFormProps) => {
  const [summaryContent, setSummaryContent] = useState(summaryInfo.content);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

  const suggestionRef = useRef<HTMLDivElement | null>(null);

  // Determine if we're adding new summary or updating existing one
  const isAddingNew = !summaryInfo.content;

  /**
   * Scroll to AI suggestion when generated
   */
  useEffect(() => {
    if (aiSuggestion && suggestionRef.current) {
      suggestionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [aiSuggestion]);

  const handleGenerate = async () => {
    setAiGenerating(true);
    const prompt = generatePrompt("summary", jobTitle);

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    if (data.result) setAiSuggestion(data.result);

    setAiGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await upsertSummary(formData);

      if (isAddingNew) {
        toast.success("Added summary successfully!");
      } else {
        toast.success("Updated summary successfully!");
      }

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add summary");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptSuggestion = () => {
    setSummaryContent(aiSuggestion);
    setAiSuggestion("");
    setIsEditing(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSummaryContent(e.target.value);
    setIsEditing(true);
  };

  return (
    <div>
      <PageHeader
        title="Summary"
        resumeId={resumeId}
        nextPage="experiences"
        showSkip={true}
        showPrevious={true}
        isEditing={isEditing}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="resumeId" value={resumeId} />

        <p className="paragraph">
          If you already have strong experience or impressive projects,
          highlight those instead — in a professional resume, a summary section
          is often optional.
        </p>

        <div className="mt-4">
          <div className="flex justify-between items-end">
            <label htmlFor="content" className="label">
              Summary
            </label>
            <GenerateFromAIButton
              onclick={handleGenerate}
              loading={aiGenerating}
            />
          </div>

          <Textarea
            name="content"
            id="content"
            value={summaryContent}
            onChange={handleContentChange}
            required
          />
        </div>

        <div className="flex justify-end">
          <LoadingButton
            loading={loading}
            loadingText={isAddingNew ? "Adding" : "Updating"}
            title={isAddingNew ? "Add Summary" : "Update Summary"}
          />
        </div>

        {/* AI Suggestion */}
        {aiSuggestion && (
          <div ref={suggestionRef}>
            <h3 className="text-green-500 font-bold">Generated From AI 🎉</h3>
            <div
              className="mt-4 p-4 lg:p-6 rounded-lg shadow-md mb-0 border border-gray-700 cursor-pointer"
              onClick={handleAcceptSuggestion}
            >
              <p className="paragraph whitespace-pre-line">{aiSuggestion}</p>
              <p className="text-xs text-right text-blue-500 hover:text-blue-600 mt-2 active:scale-105">
                Click to apply
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SummaryForm;
