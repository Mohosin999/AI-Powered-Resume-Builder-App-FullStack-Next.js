// "use client";

// import { useState } from "react";
// import { SubmitButton } from "@/components/ui/submit-button";
// import { upsertSummary } from "@/actions/resume-actions";
// import GenerateFromAIButton from "@/components/ui/generate-ai-button";

// type SummaryFormProps = {
//   resumeId: string;
//   defaultContent?: string;
//   jobTitle: string;
// };

// export default function SummaryForm({
//   resumeId,
//   defaultContent = "",
//   jobTitle,
// }: SummaryFormProps) {
//   const [content, setContent] = useState(defaultContent);
//   const [aiSuggestion, setAiSuggestion] = useState("");
//   const [loading, setLoading] = useState(false);

//   const prompt = `Job Title: ${jobTitle}. Depending on the job title, please provide a summary for my resume in 4 to 5 lines without any extra description.`;

//   const handleGenerate = async () => {
//     setLoading(true);

//     const res = await fetch("/api/gemini", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ prompt }),
//     });

//     const data = await res.json();

//     if (data.result) setAiSuggestion(data.result);
//     setLoading(false);
//   };

//   const handleAcceptSuggestion = () => {
//     setContent(aiSuggestion);
//   };

//   return (
//     <form action={upsertSummary} className="space-y-6">
//       <input type="hidden" name="resumeId" value={resumeId} />

//       <div className="mt-4">
//         <div className="flex justify-between items-end">
//           <label
//             htmlFor="content"
//             className="block text-sm font-medium text-[#72839E] mb-0"
//           >
//             Professional Summary
//           </label>

//           <GenerateFromAIButton onclick={handleGenerate} loading={loading} />
//         </div>

//         <textarea
//           name="content"
//           id="content"
//           rows={7}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-gray-300 bg-transparent"
//         />
//       </div>

//       <div className="flex justify-end">
//         <SubmitButton successText="Summary Saved" />
//       </div>

//       {aiSuggestion && (
//         <div>
//           <h3 className="text-blue-500 font-bold">Generated From AI</h3>
//           <div
//             className="mt-4 p-6 rounded-lg shadow-md mb-0 border border-gray-700 cursor-pointer"
//             onClick={handleAcceptSuggestion}
//           >
//             <p className=" text-white whitespace-pre-line">{aiSuggestion}</p>
//             <p className="text-xs text-right text-blue-500 hover:text-blue-600 mt-2">
//               Click to apply
//             </p>
//           </div>
//         </div>
//       )}
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { SubmitButton } from "@/components/ui/submit-button";
import { upsertSummary } from "@/actions/resume-actions";
import GenerateFromAIButton from "@/components/ui/generate-ai-button";
import { generatePrompt } from "@/lib/helper";

type SummaryFormProps = {
  resumeId: string;
  defaultContent?: string;
  jobTitle: string;
};

export default function SummaryForm({
  resumeId,
  defaultContent = "",
  jobTitle,
}: SummaryFormProps) {
  const [content, setContent] = useState(defaultContent);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

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
    setLoading(false);
  };

  const handleAcceptSuggestion = () => {
    setContent(aiSuggestion);
  };

  return (
    <form action={upsertSummary} className="space-y-6">
      <input type="hidden" name="resumeId" value={resumeId} />

      <div className="mt-4">
        <div className="flex justify-between items-end">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-[#72839E] mb-0"
          >
            Professional Summary
          </label>

          <GenerateFromAIButton onclick={handleGenerate} loading={loading} />
        </div>

        <textarea
          name="content"
          id="content"
          rows={7}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-gray-300 bg-transparent"
        />
      </div>

      <div className="flex justify-end">
        <SubmitButton successText="Summary Saved" />
      </div>

      {aiSuggestion && (
        <div>
          <h3 className="text-blue-500 font-bold">Generated From AI</h3>
          <div
            className="mt-4 p-6 rounded-lg shadow-md mb-0 border border-gray-700 cursor-pointer"
            onClick={handleAcceptSuggestion}
          >
            <p className=" text-white whitespace-pre-line">{aiSuggestion}</p>
            <p className="text-xs text-right text-blue-500 hover:text-blue-600 mt-2">
              Click to apply
            </p>
          </div>
        </div>
      )}
    </form>
  );
}
