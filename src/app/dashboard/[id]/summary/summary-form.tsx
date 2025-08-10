"use client";

import { useState } from "react";
import GenerateFromAIButton from "@/components/ui/generate-ai-button";
import { generatePrompt } from "@/utils/generate-prompt";
import { toast } from "react-toastify";
import { PageHeader } from "@/components/PageHeader";
import LoadingButton from "@/components/ui/loading-button";
import { Summary } from "@/utils/type";
import { upsertSummary } from "@/actions/resume-actions";
import Textarea from "@/components/ui/text-area";

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

  /**
   * Generates summary from AI based on job title
   */
  const handleGenerate = async () => {
    setAiGenerating(true);

    // Generate prompt based on job title
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

  /**
   * Handles form submission
   * Updates summary
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);

      // Upsert summary
      await upsertSummary(formData);

      toast.success("Summary added successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add summary");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Accepts AI suggestion
   */
  const handleAcceptSuggestion = () => {
    setSummaryContent(aiSuggestion);
    setAiSuggestion("");
    setIsEditing(true);
  };

  /**
   * Handles content change
   */
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

      {/*=====================================================================
      =                            Form section                              =
      ======================================================================*/}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden resume ID */}
        <input type="hidden" name="resumeId" value={resumeId} />

        <div className="mt-4">
          <div className="flex justify-between items-end">
            <label htmlFor="content" className="label">
              Summary
            </label>

            {/* Generate from AI button */}
            <GenerateFromAIButton
              onclick={handleGenerate}
              loading={aiGenerating}
            />
          </div>

          {/* Textarea */}
          <Textarea
            name="content"
            id="content"
            value={summaryContent}
            onChange={handleContentChange}
            required
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <LoadingButton
            loading={loading}
            loadingText="Adding"
            title="Add Summary"
          />
        </div>

        {/* AI suggestion */}
        {aiSuggestion && (
          <div>
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
      {/*======================= End of form section ========================*/}
    </div>
  );
};

export default SummaryForm;
