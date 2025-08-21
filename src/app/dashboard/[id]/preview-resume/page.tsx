import React from "react";
import {
  getEducations,
  getExperiences,
  getPersonalDetails,
  getProjects,
  getSkills,
  getSummary,
} from "@/actions/resume-actions";
import { Education, Experience, Project, Skill } from "@/utils/type";
import DownloadResumeBtn from "@/components/ui/download-button";
import ResumeHeading from "@/components/ui/resume-heading";
import ExternalLink from "@/components/ui/external-link";
import GoToTop from "@/components/go-to-top";

const PreviewResume = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const personalDetails = await getPersonalDetails(id);
  const summary = await getSummary(id);
  const experiences = await getExperiences(id);
  const projects = await getProjects(id);
  const educations = await getEducations(id);
  const skills = await getSkills(id);

  return (
    <div>
      {/*=====================================================================
      =                  No-print area for download button                   =
      ======================================================================*/}
      <div
        id="no-print"
        className="flex flex-col items-center justify-center mt-5 lg:mt-10 mb-7"
      >
        <h1 className="text-center text-2xl lg:text-3xl font-semibold text-emerald-500 mb-4">
          Congrats! Your Professional Resume is Ready.
        </h1>

        {/* Download resume button */}
        <DownloadResumeBtn />
      </div>
      {/*====================== End of no-print area ========================*/}

      {/*=====================================================================
      =                      Print area for resume preview                   =
      ======================================================================*/}
      <div
        id="print-area"
        className="max-w-5xl mx-auto bg-white dark:bg-[#1C2434] mb-10 lg:mb-14 p-4 lg:p-10 rounded-lg shadow-sm print:shadow-none"
      >
        {/*=====================================================================
      =                        Personal Details Section                      =
      ======================================================================*/}
        <div className="flex flex-col lg:flex-row print:!flex-row justify-center lg:justify-between print:!justify-between items-center">
          {/* Name and Job Title */}
          <div>
            <h2 className="text-center lg:text-left print:!text-left text-2xl font-semibold text-900-100">
              {personalDetails?.firstName} {personalDetails?.lastName}
            </h2>
            <h3 className="text-center lg:text-left print:!text-left text-800-200">
              {personalDetails?.jobTitle}
            </h3>
          </div>
          {/* Contact Information */}
          <div className="flex flex-col items-center">
            <p className="preview-contact-style">{personalDetails?.email}</p>

            {personalDetails?.socialLink && (
              <p className="preview-contact-style">
                {personalDetails?.socialLink}
              </p>
            )}
          </div>
        </div>

        {/*=====================================================================
      =                        Summary Section                               =
      ======================================================================*/}
        <div>
          <p className="mt-5 lg:mt-3 print:mt-3 text-sm text-700-300">
            {summary?.content}
          </p>
        </div>

        {/*=====================================================================
      =                         Experience Section                           =
      ======================================================================*/}
        {experiences?.length > 0 && (
          <div>
            <ResumeHeading title="E" highlight="xperience" />
            <div className="space-y-4">
              {experiences.map((experience: Experience) => (
                <div key={experience.id} className="mt-2 text-sm">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-800-200 text-base font-semibold">
                        {experience.company}
                      </p>
                      <p className="text-700-300 text-xs">
                        {experience.location}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-800-200 italic">
                        {experience.jobTitle}
                      </p>
                      {/* Date */}
                      <p className="text-700-300 text-xs">
                        {experience.startDate ? experience.startDate : "N/A"} -{" "}
                        {experience.endDate ? experience.endDate : "Present"}
                      </p>
                    </div>

                    {/* Convert string description to bullet points */}
                    <ul className="list-disc pl-5 mt-2 text-sm text-700-300">
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

        {/*=====================================================================
      =                          Projects Section                           =
      ======================================================================*/}
        {projects?.length > 0 && (
          <div>
            <ResumeHeading title="P" highlight="rojects" />
            {projects.map((project: Project) => (
              <div key={project.id} className="mt-2 text-sm">
                <div>
                  <div className="flex flex-col lg:flex-row print:flex-row justify-between items-start lg:items-center">
                    {/* <div className="flex items-center justify-between"> */}
                    <p className="text-800-200 text-base font-semibold">
                      {project.name}
                    </p>
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
                  <ul className="list-disc pl-5 mt-2 text-sm text-700-300">
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

        {/*=====================================================================
      =                         Education Section                            =
      ======================================================================*/}
        {educations?.length > 0 && (
          <div>
            <ResumeHeading title="E" highlight="ducations" />
            {educations.map((education: Education) => (
              <div key={education.id} className="mt-2 text-sm">
                <div>
                  <div className="">
                    <p className="text-800-200 text-sm">
                      {education.institution}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-800-200 text-sm">
                          {education.degree}, {education.field}
                        </p>
                      </div>
                      {/* Date */}
                      <p className="text-700-300 text-xs">
                        {education.startDate ? education.startDate : "N/A"} -{" "}
                        {education.endDate ? education.endDate : "Present"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/*=====================================================================
      =                          Skills Section                              =
      ======================================================================*/}
        {skills?.length > 0 && (
          <div>
            <ResumeHeading title="S" highlight="kills" />
            <p className="text-800-200 mt-2 text-sm">
              {skills.map((skill: Skill) => skill.name).join(" • ")}
            </p>
          </div>
        )}
      </div>
      {/*======================== End of print area =========================*/}

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
};

export default PreviewResume;
