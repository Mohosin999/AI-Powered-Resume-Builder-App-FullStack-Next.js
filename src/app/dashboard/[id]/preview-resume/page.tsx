// import React from "react";
// import {
//   getEducations,
//   getExperiences,
//   getPersonalDetails,
//   getProjects,
//   getSkills,
//   getSummary,
// } from "@/actions/resume-actions";
// import { DownloadResumeBtn } from "@/components/ui/download-button";
// import ResumeHeading from "@/components/ui/resume-heading";
// import { Education, Experience, Project, Skill } from "@/lib/type";
// import ExternalLink from "@/components/ui/external-link";

// const PreviewResume = async ({ params }: { params: { id: string } }) => {
//   const { id } = await params;

//   const personalDetails = await getPersonalDetails(id);
//   const summary = await getSummary(id);
//   const experiences = await getExperiences(id);
//   const projects = await getProjects(id);
//   const educations = await getEducations(id);
//   const skills = await getSkills(id);

//   return (
//     <div>
//       <div
//         id="no-print"
//         className="flex flex-col items-center justify-center mt-5 lg:mt-10 mb-7"
//       >
//         <h1 className="text-center text-2xl lg:text-3xl font-semibold text-green-400 mb-4">
//           Congrats! Your Professional Resume is Ready.
//         </h1>
//         <DownloadResumeBtn />
//       </div>

//       <div
//         id="print-area"
//         className="max-w-5xl mx-auto text-gray-900 bg-white mb-10 lg:mb-14 p-4 lg:p-10 rounded-lg"
//       >
//         {/* Personal Details Section */}
//         <div className="flex justify-between items-center">
//           {/* Name and Job Title */}
//           <div>
//             <h2 className="text-2xl font-semibold">
//               {personalDetails?.firstName} {personalDetails?.lastName}
//             </h2>
//             <h3>{personalDetails?.jobTitle}</h3>
//           </div>
//           {/* Contact Information */}
//           <div className="flex flex-col items-center">
//             <p className="resume-contact-info-style">
//               {personalDetails?.email}
//             </p>

//             {personalDetails?.socialLink && (
//               <p className="resume-contact-info-style">
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
//             <div className="space-y-4">
//               {experiences.map((experience: Experience) => (
//                 <div key={experience.id} className="mt-2 text-sm">
//                   <div>
//                     <div className="flex justify-between items-center">
//                       <p className="text-base font-semibold">
//                         {experience.company}
//                       </p>
//                       <p className="text-xs">{experience.location}</p>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <p className="text-sm text-gray-800 italic">
//                         {experience.jobTitle}
//                       </p>
//                       {/* Date */}
//                       <p className="text-xs">
//                         {experience.startDate
//                           ? experience.startDate.slice(0, 4)
//                           : "N/A"}{" "}
//                         to{" "}
//                         {experience.endDate
//                           ? experience.endDate.slice(0, 4)
//                           : "Present"}
//                       </p>
//                     </div>
//                     {/* <p>{experience.description}</p> */}
//                     {/* Convert string description to bullet points */}
//                     <ul className="list-disc pl-5 mt-2 text-sm">
//                       {experience.description
//                         .split(/\r?\n/)
//                         .filter((line) => line.trim() !== "") // optional: ignore empty lines
//                         .map((line, index) => (
//                           <li key={index}>{line.replace(/^[•*]\s*/, "")}</li>
//                           // removes bullet symbol from the string if already there
//                         ))}
//                     </ul>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Project Section */}
//         {projects?.length > 0 && (
//           <div>
//             <ResumeHeading title="P" highlight="rojects" />
//             {projects.map((project: Project) => (
//               <div key={project.id} className="mt-2 text-sm">
//                 <div>
//                   <div className="flex justify-between items-center">
//                     {/* <div className="flex items-center justify-between"> */}
//                     <p className="text-base font-semibold">{project.name}</p>
//                     {/* Project's Source Url */}
//                     <div className="flex gap-5">
//                       {/* Live Url */}
//                       {project.url && (
//                         <ExternalLink url={project.url} label="Live Url" />
//                       )}
//                       {/* Repo Url */}
//                       {project.repoUrl && (
//                         <ExternalLink url={project.repoUrl} label="Repo Url" />
//                       )}
//                       {/* Case Study Url */}
//                       {project.caseStudyUrl && (
//                         <ExternalLink
//                           url={project.caseStudyUrl}
//                           label="Case-Study"
//                         />
//                       )}
//                       {/* </div> */}
//                     </div>
//                   </div>
//                   {/* Convert string description to bullet points */}
//                   <ul className="list-disc pl-5 mt-2 text-sm">
//                     {project.description
//                       .split(/\r?\n/)
//                       .filter((line) => line.trim() !== "") // optional: ignore empty lines
//                       .map((line, index) => (
//                         <li key={index}>{line.replace(/^[•*]\s*/, "")}</li> // removes bullet symbol from the string if already there
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
//             {educations.map((education: Education) => (
//               <div key={education.id} className="mt-2 text-sm">
//                 <div>
//                   <div className="">
//                     <p className="text-sm">{education.institution}</p>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm">
//                           {education.degree}, {education.field}
//                         </p>
//                       </div>
//                       {/* Date */}
//                       <p className="text-xs">
//                         {education.startDate
//                           ? education.startDate.slice(0, 4)
//                           : "N/A"}{" "}
//                         to{" "}
//                         {education.endDate
//                           ? education.endDate.slice(0, 4)
//                           : "Present"}
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
//             <p className="mt-2 text-sm">
//               {skills.map((skill: Skill) => skill.name).join(" • ")}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PreviewResume;

import React from "react";
import {
  getEducations,
  getExperiences,
  getPersonalDetails,
  getProjects,
  getSkills,
  getSummary,
} from "@/actions/resume-actions";
import { DownloadResumeBtn } from "@/components/ui/download-button";
import ResumeHeading from "@/components/ui/resume-heading";
import { Education, Experience, Project, Skill } from "@/utils/type";
import ExternalLink from "@/components/ui/external-link";

const PreviewResume = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const personalDetails = await getPersonalDetails(id);
  const summary = await getSummary(id);
  const experiences = await getExperiences(id);
  const projects = await getProjects(id);
  const educations = await getEducations(id);
  const skills = await getSkills(id);

  return (
    <div>
      <div
        id="no-print"
        className="flex flex-col items-center justify-center mt-5 lg:mt-10 mb-7"
      >
        <h1 className="text-center text-2xl lg:text-3xl font-semibold text-green-400 mb-4">
          Congrats! Your Professional Resume is Ready.
        </h1>
        <DownloadResumeBtn />
      </div>

      <div
        id="print-area"
        className="max-w-5xl mx-auto text-gray-200 lg:text-gray-900 print:text-gray-900 bg-[#1C2434] mb-10 lg:mb-14 p-4 lg:p-10 rounded-lg"
      >
        {/* Personal Details Section */}
        <div className="flex flex-col lg:flex-row print:!flex-row justify-center lg:justify-between print:!justify-between items-center">
          {/* Name and Job Title */}
          <div>
            <h2 className="text-2xl font-semibold">
              {personalDetails?.firstName} {personalDetails?.lastName}
            </h2>
            <h3 className="text-center lg:text-left print:!text-left">
              {personalDetails?.jobTitle}
            </h3>
          </div>
          {/* Contact Information */}
          <div className="flex flex-col items-center">
            <p className="resume-contact-info-style">
              {personalDetails?.email}
            </p>

            {personalDetails?.socialLink && (
              <p className="resume-contact-info-style">
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
            <div className="space-y-4">
              {experiences.map((experience: Experience) => (
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
                      {/* Date */}
                      <p className="text-xs">
                        {experience.startDate
                          ? experience.startDate.slice(0, 4)
                          : "N/A"}{" "}
                        to{" "}
                        {experience.endDate
                          ? experience.endDate.slice(0, 4)
                          : "Present"}
                      </p>
                    </div>
                    {/* <p>{experience.description}</p> */}
                    {/* Convert string description to bullet points */}
                    <ul className="list-disc pl-5 mt-2 text-sm">
                      {experience.description
                        .split(/\r?\n/)
                        .filter((line) => line.trim() !== "") // optional: ignore empty lines
                        .map((line, index) => (
                          <li key={index}>{line.replace(/^[•*]\s*/, "")}</li>
                          // removes bullet symbol from the string if already there
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Section */}
        {projects?.length > 0 && (
          <div>
            <ResumeHeading title="P" highlight="rojects" />
            {projects.map((project: Project) => (
              <div key={project.id} className="mt-2 text-sm">
                <div>
                  <div className="flex justify-between items-center">
                    {/* <div className="flex items-center justify-between"> */}
                    <p className="text-base font-semibold">{project.name}</p>
                    {/* Project's Source Url */}
                    <div className="flex gap-5">
                      {/* Live Url */}
                      {project.url && (
                        <ExternalLink url={project.url} label="Live Url" />
                      )}
                      {/* Repo Url */}
                      {project.repoUrl && (
                        <ExternalLink url={project.repoUrl} label="Repo Url" />
                      )}
                      {/* Case Study Url */}
                      {project.caseStudyUrl && (
                        <ExternalLink
                          url={project.caseStudyUrl}
                          label="Case-Study"
                        />
                      )}
                      {/* </div> */}
                    </div>
                  </div>
                  {/* Convert string description to bullet points */}
                  <ul className="list-disc pl-5 mt-2 text-sm">
                    {project.description
                      .split(/\r?\n/)
                      .filter((line) => line.trim() !== "") // optional: ignore empty lines
                      .map((line, index) => (
                        <li key={index}>{line.replace(/^[•*]\s*/, "")}</li> // removes bullet symbol from the string if already there
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
            {educations.map((education: Education) => (
              <div key={education.id} className="mt-2 text-sm">
                <div>
                  <div className="">
                    <p className="text-sm">{education.institution}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">
                          {education.degree}, {education.field}
                        </p>
                      </div>
                      {/* Date */}
                      <p className="text-xs">
                        {education.startDate
                          ? education.startDate.slice(0, 4)
                          : "N/A"}{" "}
                        to{" "}
                        {education.endDate
                          ? education.endDate.slice(0, 4)
                          : "Present"}
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
            <p className="mt-2 text-sm">
              {skills.map((skill: Skill) => skill.name).join(" • ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewResume;
