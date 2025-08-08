// "use client";
// import { useState } from "react";
// import { upsertSummary } from "@/actions/resume-actions";
// import GenerateFromAIButton from "@/components/ui/generate-ai-button";
// import { generatePrompt } from "@/utils/generate-prompt";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { PageHeader } from "@/components/PageHeader";
// import { SummaryFormProps } from "@/utils/type";

// export default function SummaryForm({
//   resumeId,
//   defaultContent = "",
//   jobTitle,
// }: SummaryFormProps) {
//   const [content, setContent] = useState(defaultContent);
//   const [aiSuggestion, setAiSuggestion] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleGenerate = async () => {
//     setLoading(true);
//     const prompt = generatePrompt("summary", jobTitle);
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
//     setAiSuggestion("");
//     setIsEditing(true);
//   };

//   const handleEditStart = () => {
//     setIsEditing(true);
//   };

//   // const handleSubmit = async (formData: FormData) => {
//   //   await upsertSummary(formData);
//   //   toast.success("Summary Added Successfully!");
//   //   setIsEditing(false);
//   // };
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Submitting form...");
//     const formData = new FormData(e.currentTarget);

//     await upsertSummary(formData);
//     toast.success("Summary Added Successfully!");
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       <PageHeader
//         title="Summary"
//         resumeId={resumeId}
//         nextPage="experiences"
//         showSkip={true}
//         isEditing={isEditing}
//       />

//       <form
//         onSubmit={handleSubmit}
//         onChange={handleEditStart}
//         // onSubmit={handleEmptySubmit}
//         className="space-y-6"
//       >
//         <input type="hidden" name="resumeId" value={resumeId} />

//         <div className="mt-4">
//           <div className="flex justify-between items-end">
//             <label htmlFor="content" className="label">
//               Summary
//             </label>

//             <GenerateFromAIButton onclick={handleGenerate} loading={loading} />
//           </div>

//           <textarea
//             name="content"
//             id="content"
//             rows={7}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="text-sm lg:text-base mt-1 block w-full border border-gray-500 rounded-md text-gray-700 dark:text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 bg-transparent"
//           />
//         </div>

//         <div className="flex justify-end">
//           <Button type="submit" variant="ghost" className="ghost-btn-3rd">
//             Add Summary
//           </Button>
//         </div>

//         {aiSuggestion && (
//           <div>
//             <h3 className="text-green-400 font-bold">Generated From AI</h3>
//             <div
//               className="mt-4 p-4 lg:p-6 rounded-lg shadow-md mb-0 border border-gray-700 cursor-pointer"
//               onClick={handleAcceptSuggestion}
//             >
//               <p className="text-sm lg:text-base text-white whitespace-pre-line">
//                 {aiSuggestion}
//               </p>
//               <p className="text-xs text-right text-blue-500 hover:text-blue-600 mt-2 active:scale-105">
//                 Click to apply
//               </p>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import GenerateFromAIButton from "@/components/ui/generate-ai-button";
import { generatePrompt } from "@/utils/generate-prompt";
import { toast } from "react-toastify";
import { PageHeader } from "@/components/PageHeader";
import { SummaryFormProps } from "@/utils/type";
import LoadingButton from "@/components/ui/loadingl-button";

export default function SummaryForm({
  resumeId,
  defaultContent = "",
  jobTitle,
}: SummaryFormProps) {
  const [formValues, setFormValues] = useState<string>(defaultContent);
  console.log(formValues);

  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleAcceptSuggestion = () => {
    setFormValues(aiSuggestion);
    setAiSuggestion("");
    setIsEditing(true);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues(e.target.value);
    setIsEditing(true);
  };

  // Track user started editing (called on form change)
  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("content", formValues);

    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Summary Added Successfully!");
        setIsEditing(false);
      } else {
        toast.error(data.error || "Failed to save summary");
      }
    } catch (error: unknown) {
      console.error("Failed to save summary:", error);
      toast.error("Failed to save summary");
    } finally {
      setLoading(false);
    }
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

      <form
        onSubmit={handleSubmit}
        onChange={handleEditStart}
        className="space-y-6"
      >
        <input type="hidden" name="resumeId" value={resumeId} />

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

          <textarea
            name="content"
            id="content"
            rows={7}
            value={formValues}
            onChange={handleOnChange}
            className="text-sm lg:text-base mt-1 block w-full border border-gray-500 rounded-md text-gray-700 dark:text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 bg-transparent"
          />
        </div>

        <div className="flex justify-end">
          <LoadingButton
            loading={loading}
            loadingText="Adding"
            title="Add Summary"
          />
        </div>

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
    </div>
  );
}
