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
    <div className="max-w-4xl mx-auto bg-[#1C2434] p-8 rounded-lg shadow-sm lg:shadow-md text-white">
      {/* Personal Details Section */}
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold">
          {personalDetails?.firstName} {personalDetails?.lastName}
        </h2>
        <h3>{personalDetails?.jobTitle}</h3>
        <div className="flex justify-between items-center w-full mt-3">
          <p className="preview-resume-links-style">
            <BiLogoGmail />
            {personalDetails?.email}
          </p>
          <p className="preview-resume-links-style">
            <FaPhoneAlt />
            {personalDetails?.phone}
          </p>
          <p className="preview-resume-links-style">
            <FaLink />
            {personalDetails?.socialLink}
          </p>
        </div>
      </div>

      {/* Summary Section */}
      <div>
        <h2 className="text-lg font-semibold mt-6 border-b border-gray-600">
          Summary
        </h2>
        <p className="mt-2 text-sm">{summary?.content}</p>
      </div>

      {/* Experience Section */}
      {experiences?.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mt-6 border-b border-gray-600">
            Experiences
          </h2>
          {experiences.map((experience) => (
            <div key={experience.id} className="mt-2 text-sm">
              <div>
                <p className="text-base">{experience.jobTitle}</p>
                <div className="flex justify-between items-center text-sm">
                  <p>{experience.company}</p>
                  <p>
                    {experience.startDate} to {experience.endDate ?? "Present"}
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
          <h2 className="text-lg font-semibold mt-6 border-b border-gray-600">
            Projects
          </h2>
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
          <h2 className="text-lg font-semibold mt-6 border-b border-gray-600">
            Educations
          </h2>
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
                      {education.startDate} to {education.endDate ?? "Present"}
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
          <h2 className="text-lg font-semibold mt-6 border-b">Skills</h2>
          <p className="mt-2 textbase">
            {skills.map((skill) => skill.name).join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default PreviewResume;
