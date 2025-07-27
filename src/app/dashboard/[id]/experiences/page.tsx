// import React from "react";
// import { getExperiences, upsertExperience } from "@/actions/resume-actions";
// import { ExperienceFormModal } from "@/components/experience-form-modal";
// import { ExperienceForm } from "@/components/experience-form";
// import { SubmitButton } from "@/components/ui/submit-button";
// import NextButton from "@/components/ui/next-button";

// interface ExperiencePageProps {
//   params: {
//     id: string;
//   };
// }

// export default async function ExperiencePage({ params }: ExperiencePageProps) {
//   const experiences = await getExperiences(params.id);

//   return (
//     <div className="max-w-4xl mx-auto card-style">
//       {/* Title & Next Button */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-gray-100 text-2xl font-bold mb-6">
//           Work Experience
//         </h1>

//         <NextButton id={params.id} pageName="projects" />
//       </div>

//       {/* Add Experience Section - Shows button when experiences exist, form when none */}
//       {experiences.length > 0 ? (
//         <div className="mb-6">
//           <ExperienceFormModal resumeId={params.id} />
//         </div>
//       ) : (
//         <div className="bg-[#1C2434]  p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-gray-300 text-xl font-semibold mb-4">
//             Add New Experience
//           </h2>
//           <ExperienceForm resumeId={params.id} />
//         </div>
//       )}

//       {/* ===============================================================
//        *        Experience List - Only shows when experiences exist
//        ===============================================================*/}
//       {experiences.length > 0 && (
//         <div className="space-y-6">
//           {experiences.map((exp) => (
//             <div key={exp.id} className="p-6 rounded-lg shadow-md">
//               <form action={upsertExperience} className="space-y-4">
//                 <input type="hidden" name="id" value={exp.id} />
//                 <input type="hidden" name="resumeId" value={params.id} />

//                 <div className="flex justify-between items-start">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
//                     <div>
//                       <label className="block text-sm font-medium text-[#72839E] mb-1">
//                         Job Title *
//                       </label>
//                       <input
//                         name="jobTitle"
//                         type="text"
//                         defaultValue={exp.jobTitle}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-[#72839E] mb-1">
//                         Company *
//                       </label>
//                       <input
//                         name="company"
//                         type="text"
//                         defaultValue={exp.company}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-[#72839E] mb-1">
//                     Location
//                   </label>
//                   <input
//                     name="location"
//                     type="text"
//                     defaultValue={exp.location || ""}
//                     className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#72839E] mb-1">
//                       Start Date *
//                     </label>
//                     <input
//                       name="startDate"
//                       type="date"
//                       defaultValue={exp.startDate}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-[#72839E] mb-1">
//                       End Date
//                     </label>
//                     <input
//                       name="endDate"
//                       type="date"
//                       defaultValue={exp.endDate || ""}
//                       className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
//                     />
//                     <div className="mt-2 flex items-center">
//                       <input
//                         id={`current-${exp.id}`}
//                         name="current"
//                         type="checkbox"
//                         defaultChecked={exp.current}
//                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded "
//                       />
//                       <label
//                         htmlFor={`current-${exp.id}`}
//                         className="ml-2 block text-sm text-[#72839E]"
//                       >
//                         I currently work here
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-[#72839E] mb-1">
//                     Description *
//                   </label>
//                   <textarea
//                     name="description"
//                     rows={4}
//                     defaultValue={exp.description}
//                     required
//                     className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
//                   />
//                 </div>

//                 <div className="flex justify-between">
//                   <SubmitButton
//                     defaultText="Update Experience"
//                     pendingText="Updating..."
//                     successText="Updated"
//                   />

//                   <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
//                     Delete Experience
//                   </button>
//                 </div>
//               </form>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React from "react";
import { getExperiences, upsertExperience } from "@/actions/resume-actions";
import { ExperienceFormModal } from "@/components/experience-form-modal";
import { ExperienceForm } from "@/components/experience-form";
import { SubmitButton } from "@/components/ui/submit-button";
import NextButton from "@/components/ui/next-button";

interface ExperiencePageProps {
  params: {
    id: string;
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const experiences = await getExperiences(params.id);

  return (
    <div className="max-w-4xl mx-auto card-style">
      {/* Title & Next Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-gray-100 text-2xl font-bold mb-6">
          Work Experience
        </h1>

        <NextButton id={params.id} pageName="projects" />
      </div>

      {/* Add Experience Section - Shows button when experiences exist, form when none */}
      {experiences.length > 0 ? (
        <div className="mb-6">
          <ExperienceFormModal resumeId={params.id} />
        </div>
      ) : (
        <div className="bg-[#1C2434]  p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-gray-300 text-xl font-semibold mb-4">
            Add New Experience
          </h2>
          <ExperienceForm resumeId={params.id} />
        </div>
      )}

      {/* ===============================================================
       *        Experience List - Only shows when experiences exist
       ===============================================================*/}
      {experiences.length > 0 && (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-6 rounded-lg shadow-md">
              <form action={upsertExperience} className="space-y-4">
                <input type="hidden" name="id" value={exp.id} />
                <input type="hidden" name="resumeId" value={params.id} />

                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div>
                      <label className="block text-sm font-medium text-[#72839E] mb-1">
                        Job Title *
                      </label>
                      <input
                        name="jobTitle"
                        type="text"
                        defaultValue={exp.jobTitle}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#72839E] mb-1">
                        Company *
                      </label>
                      <input
                        name="company"
                        type="text"
                        defaultValue={exp.company}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#72839E] mb-1">
                    Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    defaultValue={exp.location || ""}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#72839E] mb-1">
                      Start Date *
                    </label>
                    <input
                      name="startDate"
                      type="date"
                      defaultValue={exp.startDate}
                      required
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
                      defaultValue={exp.endDate || ""}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                    />
                    <div className="mt-2 flex items-center">
                      <input
                        id={`current-${exp.id}`}
                        name="current"
                        type="checkbox"
                        defaultChecked={exp.current}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded "
                      />
                      <label
                        htmlFor={`current-${exp.id}`}
                        className="ml-2 block text-sm text-[#72839E]"
                      >
                        I currently work here
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#72839E] mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    defaultValue={exp.description}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                  />
                </div>

                <div className="flex justify-between">
                  <SubmitButton
                    defaultText="Update Experience"
                    pendingText="Updating..."
                    successText="Updated"
                  />

                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Delete Experience
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
