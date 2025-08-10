"use client";

import { useState } from "react";
import GenerateFromAIButton from "@/components/ui/generate-ai-button";
import { generatePrompt } from "@/utils/generate-prompt";
import { toast } from "react-toastify";
import { PageHeader } from "@/components/PageHeader";
import LoadingButton from "@/components/ui/loading-button";
import { Summary } from "@/utils/type";
import { upsertSummary } from "@/actions/resume-actions";

interface SummaryFormProps {
  resumeId: string;
  summaryInfo: Summary;
  jobTitle: string;
}

/**
 * Summary form component
 *
 * @param {string} resumeId The ID of the resume
 * @param {Object} summaryInfo The summary object
 * @param {string} jobTitle The job title from personal details section
 * @returns {JSX.Element} The summary form
 */
const SummaryForm = ({ resumeId, summaryInfo, jobTitle }: SummaryFormProps) => {
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Handles generate button click
   * Generates summary from AI based on job title
   *
   * @returns {Promise<void>} A promise that resolves when the button is clicked
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
   *
   * @param {React.FormEvent<HTMLFormElement>} e The form event
   * @returns {Promise<void>} A promise that resolves when the form is submitted
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
      toast.error(
        error instanceof Error ? error.message : "Failed to add summary"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptSuggestion = () => {
    setAiSuggestion("");
    setIsEditing(true);
  };

  const handleContentChange = () => {
    setIsEditing(true);
  };

  return (
    <div>
      <PageHeader
        title="Summary"
        resumeId={resumeId}
        nextPage="experiences"
        showSkip={true}
        isEditing={isEditing}
      />

      {/*=====================================================================
      =                            Form section                              =
      ======================================================================*/}
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <textarea
            name="content"
            id="content"
            rows={7}
            defaultValue={summaryInfo.content}
            onChange={handleContentChange}
            className="text-sm lg:text-base mt-1 block w-full border border-gray-500 rounded-md text-gray-700 dark:text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 bg-transparent"
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
            <h3 className="text-green-400 font-bold">Generated From AI</h3>
            <div
              className="mt-4 p-4 lg:p-6 rounded-lg shadow-md mb-0 border border-gray-700 cursor-pointer"
              onClick={handleAcceptSuggestion}
            >
              <p className="text-sm lg:text-base text-white whitespace-pre-line">
                {aiSuggestion}
              </p>
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
