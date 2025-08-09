// "use client";

// import React, { useState } from "react";
// import { deleteExperience, upsertExperience } from "@/actions/resume-actions";
// import { ExperienceFormModal } from "@/components/experience-form-modal";
// import { ExperienceForm } from "@/components/experience-form";
// import { PageHeader } from "@/components/PageHeader";
// import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { Experience } from "@/utils/type";

// interface ExperiencePageClientProps {
//   experiences: Experience[];
//   resumeId: string;
// }

// export default function ExperiencePageClient({
//   experiences,
//   resumeId,
// }: ExperiencePageClientProps) {
//   const [open, setOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSubmit = async (formData: FormData) => {
//     await upsertExperience(formData);
//     toast.success("Experience Updated Successfully!");
//     setIsEditing(false);
//   };

//   // Add this function to detect when editing starts
//   const handleEditStart = () => {
//     setIsEditing(true);
//   };

//   const confirmDelete = (id: string) => {
//     setDeleteId(id);
//     setOpen(true);
//   };

//   return (
//     <div className="max-w-4xl mx-auto card">
//       <PageHeader
//         title="Experiences"
//         resumeId={resumeId}
//         nextPage="projects"
//         showSkip={true}
//         isEditing={isEditing}
//       />

//       {experiences.length > 0 ? (
//         <div className="mb-6">
//           <ExperienceFormModal resumeId={resumeId} />
//         </div>
//       ) : (
//         <div className="bg-[#1C2434] p-6 rounded-lg shadow-md mb-0 mt-2 border border-gray-700">
//           <h2 className="text-gray-300 text-xl font-semibold mb-4">
//             Add New Experience
//           </h2>
//           <ExperienceForm resumeId={resumeId} />
//         </div>
//       )}

//       {experiences.length > 0 && (
//         <div className="space-y-6">
//           {experiences.map((exp) => (
//             <div key={exp.id} className="p-4 lg:p-6 rounded-lg custom-border">
//               <form
//                 onSubmit={handleSubmit}
//                 onChange={handleEditStart}
//                 className="space-y-4"
//               >
//                 <input type="hidden" name="id" value={exp.id} />
//                 <input type="hidden" name="resumeId" value={resumeId} />

//                 <div className="flex justify-between items-start">
//                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
//                     <div>
//                       <label className="label">
//                         Job Title - Technologies Used *
//                       </label>
//                       <input
//                         name="jobTitle"
//                         type="text"
//                         defaultValue={exp.jobTitle}
//                         placeholder="Frontend Developer - Next.js, TypeScript, Prisma"
//                         required
//                         className="input"
//                       />
//                     </div>
//                     <div>
//                       <label className="label">Company *</label>
//                       <input
//                         name="company"
//                         type="text"
//                         defaultValue={exp.company}
//                         placeholder="Google | Freelance"
//                         required
//                         className="text-sm input"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="label">Location</label>
//                   <input
//                     name="location"
//                     type="text"
//                     defaultValue={exp.location || ""}
//                     placeholder="San Francisco, USA | Remote"
//                     className="input"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="label">Start Date *</label>
//                     <input
//                       name="startDate"
//                       type="date"
//                       defaultValue={exp.startDate}
//                       required
//                       className="input"
//                     />
//                   </div>
//                   <div>
//                     <label className="label">End Date</label>
//                     <input
//                       name="endDate"
//                       type="date"
//                       defaultValue={exp.endDate || ""}
//                       className="input"
//                     />
//                     <div className="mt-2 flex items-center">
//                       <input
//                         id={`current-${exp.id}`}
//                         name="current"
//                         type="checkbox"
//                         defaultChecked={exp.current}
//                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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
//                   <label className="label">Description *</label>
//                   <textarea
//                     name="description"
//                     rows={7}
//                     defaultValue={exp.description}
//                     required
//                     className="input"
//                   />
//                 </div>

//                 <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-2">
//                   <Button
//                     type="submit"
//                     variant="outline"
//                     className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 active:scale-105 cursor-pointer"
//                   >
//                     Update Experience
//                   </Button>

//                   <Button
//                     type="button"
//                     onClick={() => confirmDelete(exp.id)}
//                     className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white px-4 py-2 rounded-md active:scale-105 cursor-pointer"
//                   >
//                     Delete Experience
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           ))}
//         </div>
//       )}

//       <DeleteConfirmDialog
//         open={open}
//         setOpen={setOpen}
//         id={deleteId}
//         resumeId={resumeId}
//         deleteAction={deleteExperience}
//         description="This will permanently delete the experience from your resume."
//       />
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { deleteExperience } from "@/actions/resume-actions";
import { ExperienceFormModal } from "@/components/experience-form-modal";
import { ExperienceForm } from "@/components/experience-form";
import { PageHeader } from "@/components/PageHeader";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Experience } from "@/utils/type";
import { LoaderCircle } from "lucide-react";

interface ExperiencePageClientProps {
  experiences: Experience[];
  resumeId: string;
}

export default function ExperiencePageClient({
  experiences,
  resumeId,
}: ExperiencePageClientProps) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/experiences", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Submission failed");

      toast.success("Experience updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating experience");
    } finally {
      setLoading(false);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto card">
      <PageHeader
        title="Experiences"
        resumeId={resumeId}
        nextPage="projects"
        showSkip={true}
        isEditing={isEditing}
      />

      {experiences.length > 0 ? (
        <div className="mb-6">
          <ExperienceFormModal resumeId={resumeId} />
        </div>
      ) : (
        <div className="bg-[#1C2434] p-6 rounded-lg shadow-md mb-0 mt-2 border border-gray-700">
          <h2 className="text-gray-300 text-xl font-semibold mb-4">
            Add New Experience
          </h2>
          <ExperienceForm resumeId={resumeId} />
        </div>
      )}

      {experiences.length > 0 && (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-4 lg:p-6 rounded-lg custom-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="id" value={exp.id} />
                <input type="hidden" name="resumeId" value={resumeId} />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                  <div>
                    <label className="label">
                      Job Title - Technologies Used *
                    </label>
                    <input
                      name="jobTitle"
                      type="text"
                      defaultValue={exp.jobTitle}
                      placeholder="Frontend Developer - Next.js, TypeScript, Prisma"
                      required
                      className="input"
                      onChange={handleEditStart}
                    />
                  </div>
                  <div>
                    <label className="label">Company *</label>
                    <input
                      name="company"
                      type="text"
                      defaultValue={exp.company}
                      placeholder="Google | Freelance"
                      required
                      className="text-sm input"
                      onChange={handleEditStart}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Location</label>
                  <input
                    name="location"
                    type="text"
                    defaultValue={exp.location || ""}
                    placeholder="San Francisco, USA | Remote"
                    className="input"
                    onChange={handleEditStart}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Start Date *</label>
                    <input
                      name="startDate"
                      type="date"
                      defaultValue={exp.startDate}
                      required
                      className="input"
                      onChange={handleEditStart}
                    />
                  </div>
                  <div>
                    <label className="label">End Date</label>
                    <input
                      name="endDate"
                      type="date"
                      defaultValue={exp.endDate || ""}
                      className="input"
                      onChange={handleEditStart}
                    />
                    <div className="mt-2 flex items-center">
                      <input
                        id={`current-${exp.id}`}
                        name="current"
                        type="checkbox"
                        defaultChecked={exp.current}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        onChange={handleEditStart}
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
                  <label className="label">Description *</label>
                  <textarea
                    name="description"
                    rows={7}
                    defaultValue={exp.description}
                    required
                    className="input"
                    onChange={handleEditStart}
                  />
                </div>

                <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-2">
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={loading}
                    className="flex items-center gap-2 text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 active:scale-105 cursor-pointer"
                  >
                    {loading && (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}
                    {loading ? "Updating..." : "Update Experience"}
                  </Button>

                  <Button
                    type="button"
                    onClick={() => confirmDelete(exp.id)}
                    className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white px-4 py-2 rounded-md active:scale-105 cursor-pointer"
                  >
                    Delete Experience
                  </Button>
                </div>
              </form>
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={open}
        setOpen={setOpen}
        id={deleteId}
        resumeId={resumeId}
        deleteAction={deleteExperience}
        description="This will permanently delete the experience from your resume."
      />
    </div>
  );
}
