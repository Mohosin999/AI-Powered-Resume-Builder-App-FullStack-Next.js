import React from "react";
import { FaBrain } from "react-icons/fa";
import { SubmitButton } from "@/components/ui/submit-button";
import { PageHeader } from "@/components/PageHeader";
import { getSummary, upsertSummary } from "@/actions/resume-actions";

interface SummaryPageProps {
  params: {
    id: string;
  };
}

const SummaryPage = async ({ params }: SummaryPageProps) => {
  const summaryInfo = await getSummary(params.id);
  console.log("summary ", summaryInfo?.content);

  return (
    <div className="max-w-4xl mx-auto card-style">
      <PageHeader
        title="Summary"
        resumeId={params.id}
        nextPage="experiences"
        showSkip={true}
      />

      {/* Form */}
      <form action={upsertSummary} className="space-y-6">
        <input type="hidden" name="resumeId" value={params.id} />

        <div className="mt-4">
          {/* Label and Generate from AI Button */}
          <div className="flex justify-between items-end">
            {/* Changed to items-end */}
            <label
              htmlFor="content"
              className="block text-sm font-medium text-[#72839E] mb-0"
            >
              Professional Summary
            </label>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-2"
            >
              <FaBrain />
              Generate from AI
            </button>
          </div>

          <textarea
            name="content"
            id="content"
            rows={8}
            defaultValue={summaryInfo?.content || ""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-gray-300 bg-transparent"
          />
        </div>

        <div className="flex justify-end">
          <SubmitButton successText="Summary Saved" />
        </div>
      </form>
    </div>
  );
};

export default SummaryPage;
