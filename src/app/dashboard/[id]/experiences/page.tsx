// import React from "react";
// import { getExperiences, upsertExperience } from "@/actions/resume-actions";

// interface ExperiencePageProps {
//   params: {
//     id: string;
//   };
// }

// export default async function ExperiencePage({ params }: ExperiencePageProps) {
//   const experiences = await getExperiences(params.id);

//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
//       <h1 className="text-2xl font-bold mb-6">Work Experience</h1>

//       {/* ====================================================================
//       *                           Add New Experience Form
//       ======================================================================*/}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-xl font-semibold mb-4">Add New Experience</h2>

//         <form action={upsertExperience} className="space-y-4">
//           <input type="hidden" name="resumeId" value={params.id} />
//           {/* No ID field for new experiences */}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Job Title *
//               </label>
//               <input
//                 name="jobTitle"
//                 type="text"
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Company *
//               </label>
//               <input
//                 name="company"
//                 type="text"
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Location
//             </label>
//             <input
//               name="location"
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Start Date *
//               </label>
//               <input
//                 name="startDate"
//                 type="date"
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 End Date
//               </label>
//               <input
//                 name="endDate"
//                 type="date"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//               <div className="mt-2 flex items-center">
//                 <input
//                   id="current-new" // Unique ID for new form
//                   name="current"
//                   type="checkbox"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="current-new"
//                   className="ml-2 block text-sm text-gray-700"
//                 >
//                   I currently work here
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description *
//             </label>
//             <textarea
//               name="description"
//               rows={4}
//               required
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <button
//             type="submit"
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Add Experience
//           </button>
//         </form>
//       </div>

//       {/* ====================================================================
//       *                      Experience List with Edit Forms
//       ======================================================================*/}
//       <div className="space-y-6">
//         {experiences.map((exp) => (
//           <div key={exp.id} className="bg-white p-6 rounded-lg shadow-md">
//             <form action={upsertExperience} className="space-y-4">
//               <input type="hidden" name="id" value={exp.id} />
//               <input type="hidden" name="resumeId" value={params.id} />

//               <div className="flex justify-between items-start">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Job Title *
//                     </label>
//                     <input
//                       name="jobTitle"
//                       type="text"
//                       defaultValue={exp.jobTitle}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Company *
//                     </label>
//                     <input
//                       name="company"
//                       type="text"
//                       defaultValue={exp.company}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Location
//                 </label>
//                 <input
//                   name="location"
//                   type="text"
//                   defaultValue={exp.location || ""}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Date *
//                   </label>
//                   <input
//                     name="startDate"
//                     type="date"
//                     defaultValue={exp.startDate}
//                     required
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     End Date
//                   </label>
//                   <input
//                     name="endDate"
//                     type="date"
//                     defaultValue={exp.endDate || ""}
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                   />
//                   <div className="mt-2 flex items-center">
//                     <input
//                       id={`current-${exp.id}`}
//                       name="current"
//                       type="checkbox"
//                       defaultChecked={exp.current}
//                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                     />
//                     <label
//                       htmlFor={`current-${exp.id}`}
//                       className="ml-2 block text-sm text-gray-700"
//                     >
//                       I currently work here
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description *
//                 </label>
//                 <textarea
//                   name="description"
//                   rows={4}
//                   defaultValue={exp.description}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div className="flex justify-between">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                 >
//                   Update Experience
//                 </button>

//                 <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
//                   Delete Experience
//                 </button>
//               </div>
//             </form>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// app/[id]/experience/page.tsx
import React from "react";
import { getExperiences, upsertExperience } from "@/actions/resume-actions";
import { ExperienceFormModal } from "@/components/experience-form-modal";
import { ExperienceForm } from "@/components/experience-form";

interface ExperiencePageProps {
  params: {
    id: string;
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const experiences = await getExperiences(params.id);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Work Experience</h1>

      {/* Add Experience Section - Shows button when experiences exist, form when none */}
      {experiences.length > 0 ? (
        <div className="mb-6">
          <ExperienceFormModal resumeId={params.id} />
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Experience</h2>
          <ExperienceForm resumeId={params.id} />
        </div>
      )}

      {/* Experience List - Only shows when experiences exist */}
      {experiences.length > 0 && (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-white p-6 rounded-lg shadow-md">
              <form action={upsertExperience} className="space-y-4">
                <input type="hidden" name="id" value={exp.id} />
                <input type="hidden" name="resumeId" value={params.id} />

                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title *
                      </label>
                      <input
                        name="jobTitle"
                        type="text"
                        defaultValue={exp.jobTitle}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company *
                      </label>
                      <input
                        name="company"
                        type="text"
                        defaultValue={exp.company}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    defaultValue={exp.location || ""}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      name="startDate"
                      type="date"
                      defaultValue={exp.startDate}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      name="endDate"
                      type="date"
                      defaultValue={exp.endDate || ""}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <div className="mt-2 flex items-center">
                      <input
                        id={`current-${exp.id}`}
                        name="current"
                        type="checkbox"
                        defaultChecked={exp.current}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`current-${exp.id}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        I currently work here
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    defaultValue={exp.description}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Update Experience
                  </button>

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
