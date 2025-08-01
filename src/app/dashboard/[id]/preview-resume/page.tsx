// import React from "react";
// import Link from "next/link";
// import {
//   getEducations,
//   getExperiences,
//   getPersonalDetails,
//   getProjects,
//   getSkills,
//   getSummary,
// } from "@/actions/resume-actions";
// import { BiLogoGmail } from "react-icons/bi";
// import { FaPhoneAlt, FaLink } from "react-icons/fa";
// import { DownloadResumeBtn } from "@/components/ui/download-button";
// import ResumeHeading from "@/components/ui/resume-heading";

// interface PreviewResumeProps {
//   params: {
//     id: string;
//   };
// }

// const PreviewResume = async ({ params }: PreviewResumeProps) => {
//   const personalDetails = await getPersonalDetails(params.id);
//   const summary = await getSummary(params.id);
//   const experiences = await getExperiences(params.id);
//   const projects = await getProjects(params.id);
//   const educations = await getEducations(params.id);
//   const skills = await getSkills(params.id);

//   return (
//     // <div className="max-w-6xl mx-auto bg-[#1C2434] p-8 rounded-lg shadow-sm lg:shadow-md text-white">
//     <div>
//       <div
//         id="no-print"
//         className="flex flex-col items-center justify-center mt-14 mb-7"
//       >
//         <h1 className="text-3xl font-bold text-green-400 mb-4">
//           Congrats! Your Professional Resume is Ready.
//         </h1>
//         <DownloadResumeBtn />
//       </div>

//       <div
//         id="print-area"
//         className="max-w-5xl mx-auto text-gray-900 bg-gray-300 my-0 p-10 rounded-lg"
//       >
//         {/* Personal Details Section */}
//         <div className="flex flex-col justify-center items-center">
//           <h2 className="text-2xl font-semibold">
//             {personalDetails?.firstName} {personalDetails?.lastName}
//           </h2>
//           <h3>{personalDetails?.jobTitle}</h3>
//           <div
//             className={`flex ${
//               personalDetails?.socialLink ? "justify-between" : "justify-center"
//             } items-center w-full`}
//           >
//             <p className="preview-resume-links-style">
//               {personalDetails?.email}
//             </p>
//             {/* <p className="preview-resume-links-style">
//               <FaPhoneAlt />
//               {personalDetails?.phone}
//             </p> */}
//             {personalDetails?.socialLink && (
//               <p className="preview-resume-links-style">
//                 {personalDetails?.socialLink}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Summary Section */}
//         <div>
//           {/* <h2 className="text-lg font-semibold mt-6 border-b border-gray-600">
//             Objective
//           </h2> */}
//           <p className="mt-3 text-sm">{summary?.content}</p>
//         </div>

//         {/* Experience Section */}
//         {experiences?.length > 0 && (
//           <div>
//             <ResumeHeading title="E" highlight="xperience" />
//             {experiences.map((experience) => (
//               <div key={experience.id} className="mt-2 text-sm">
//                 <div>
//                   <div className="flex justify-between items-center">
//                     <p className="text-base font-semibold">
//                       {experience.company}
//                     </p>
//                     <p className="text-xs">{experience.location}</p>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm">{experience.jobTitle}</p>
//                     <p className="text-xs">
//                       {experience.startDate} to{" "}
//                       {experience.endDate ?? "Present"}
//                     </p>
//                   </div>
//                   {/* <p>{experience.description}</p> */}
//                   {/* Convert string description to bullet points */}
//                   <ul className="list-disc pl-5 mt-2 text-sm">
//                     {experience.description
//                       .split(/\r?\n/)
//                       .filter((line) => line.trim() !== "") // optional: ignore empty lines
//                       .map((line, index) => (
//                         <li key={index}>{line.replace(/^•\s*/, "")}</li> // removes bullet symbol from the string if already there
//                       ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Project Section */}
//         {projects?.length > 0 && (
//           <div>
//             <ResumeHeading title="P" highlight="rojects" />
//             {projects.map((project) => (
//               <div key={project.id} className="mt-2 text-sm">
//                 <div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <p className="text-base">{project.name}</p>
//                       <Link
//                         href={project.url ?? "#"}
//                         target="_blank"
//                         className="text-xs text-blue-500 ml-2"
//                       >
//                         Live Link
//                       </Link>
//                     </div>
//                     <p className="text-sm">
//                       {project.startDate} to {project.endDate}
//                     </p>
//                   </div>
//                   {/* Convert string description to bullet points */}
//                   <ul className="list-disc pl-5 mt-2 text-sm">
//                     {project.description
//                       .split(/\r?\n/)
//                       .filter((line) => line.trim() !== "") // optional: ignore empty lines
//                       .map((line, index) => (
//                         <li key={index}>{line.replace(/^•\s*/, "")}</li> // removes bullet symbol from the string if already there
//                       ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Education Section */}
//         {educations?.length > 0 && (
//           <div>
//             <ResumeHeading title="E" highlight="ducations" />
//             {educations.map((education) => (
//               <div key={education.id} className="mt-2 text-sm">
//                 <div>
//                   <div className="">
//                     <p className="text-base">{education.institution}</p>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm">
//                           {education.degree}, {education.field}
//                         </p>
//                       </div>
//                       <p className="text-sm">
//                         {education.startDate} to{" "}
//                         {education.endDate ?? "Present"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Skills Section */}
//         {skills?.length > 0 && (
//           <div>
//             <ResumeHeading title="S" highlight="kills" />
//             <p className="mt-2 textbase">
//               {skills.map((skill) => skill.name).join(" • ")}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PreviewResume;

import React from "react";
import Link from "next/link";
import {
  getEducations,
  getExperiences,
  getPersonalDetails,
  getProjects,
  getSkills,
  getSummary,
} from "@/actions/resume-actions";
import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt, FaLink } from "react-icons/fa";
import { DownloadResumeBtn } from "@/components/ui/download-button";
import ResumeHeading from "@/components/ui/resume-heading";

interface PreviewResumeProps {
  params: {
    id: string;
  };
}

const PreviewResume = async ({ params }: PreviewResumeProps) => {
  const personalDetails = await getPersonalDetails(params.id);
  const summary = await getSummary(params.id);
  const experiences = await getExperiences(params.id);
  const projects = await getProjects(params.id);
  const educations = await getEducations(params.id);
  const skills = await getSkills(params.id);

  return (
    // <div className="max-w-6xl mx-auto bg-[#1C2434] p-8 rounded-lg shadow-sm lg:shadow-md text-white">
    <div>
      <div
        id="no-print"
        className="flex flex-col items-center justify-center mt-14 mb-7"
      >
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          Congrats! Your Professional Resume is Ready.
        </h1>
        <DownloadResumeBtn />
      </div>

      <div
        id="print-area"
        className="max-w-5xl mx-auto text-gray-900 bg-gray-300 my-0 p-10 rounded-lg"
      >
        {/* Personal Details Section */}
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold">
            {personalDetails?.firstName} {personalDetails?.lastName}
          </h2>
          <h3>{personalDetails?.jobTitle}</h3>
          <div
            className={`flex ${
              personalDetails?.socialLink ? "justify-between" : "justify-center"
            } items-center w-full`}
          >
            <p className="preview-resume-links-style">
              {personalDetails?.email}
            </p>
            <p className="preview-resume-links-style">
              {personalDetails?.phone}
            </p>
            {personalDetails?.socialLink && (
              <p className="preview-resume-links-style">
                {personalDetails?.socialLink}
              </p>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div>
          {/* <h2 className="text-lg font-semibold mt-6 border-b border-gray-600">
            Objective
          </h2> */}
          <p className="mt-3 text-sm">{summary?.content}</p>
        </div>

        {/* Experience Section */}
        {experiences?.length > 0 && (
          <div>
            <ResumeHeading title="E" highlight="xperience" />
            {experiences.map((experience) => (
              <div key={experience.id} className="mt-2 text-sm">
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-base font-semibold">
                      {experience.company}
                    </p>
                    <p className="text-xs">{experience.location}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-800 italic">
                      {experience.jobTitle}
                    </p>
                    <p className="text-xs">
                      {experience.startDate} to{" "}
                      {experience.endDate ?? "Present"}
                    </p>
                  </div>
                  {/* <p>{experience.description}</p> */}
                  {/* Convert string description to bullet points */}
                  <ul className="list-disc pl-5 mt-2 text-sm">
                    {experience.description
                      .split(/\r?\n/)
                      .filter((line) => line.trim() !== "") // optional: ignore empty lines
                      .map((line, index) => (
                        <li key={index}>{line.replace(/^•\s*/, "")}</li> // removes bullet symbol from the string if already there
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Section */}
        {projects?.length > 0 && (
          <div>
            <ResumeHeading title="P" highlight="rojects" />
            {projects.map((project) => (
              <div key={project.id} className="mt-2 text-sm">
                <div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <p className="text-base">{project.name}</p>
                      <Link
                        href={project.url ?? "#"}
                        target="_blank"
                        className="text-xs text-blue-500 ml-2"
                      >
                        Live Link
                      </Link>
                    </div>
                    <p className="text-sm">
                      {project.startDate} to {project.endDate}
                    </p>
                  </div>
                  {/* Convert string description to bullet points */}
                  <ul className="list-disc pl-5 mt-2 text-sm">
                    {project.description
                      .split(/\r?\n/)
                      .filter((line) => line.trim() !== "") // optional: ignore empty lines
                      .map((line, index) => (
                        <li key={index}>{line.replace(/^•\s*/, "")}</li> // removes bullet symbol from the string if already there
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {educations?.length > 0 && (
          <div>
            <ResumeHeading title="E" highlight="ducations" />
            {educations.map((education) => (
              <div key={education.id} className="mt-2 text-sm">
                <div>
                  <div className="">
                    <p className="text-base">{education.institution}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">
                          {education.degree}, {education.field}
                        </p>
                      </div>
                      <p className="text-sm">
                        {education.startDate} to{" "}
                        {education.endDate ?? "Present"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <div>
            <ResumeHeading title="S" highlight="kills" />
            <p className="mt-2 textbase">
              {skills.map((skill) => skill.name).join(" • ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewResume;
