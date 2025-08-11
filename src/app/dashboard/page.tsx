import React from "react";
import Image from "next/image";
import { getResumes } from "@/actions/resume-actions";
import DisplayAllResumes from "@/components/display-all-resumes";

const Dashboard = async () => {
  const allResumes = await getResumes();

  return (
    <div>
      {allResumes.length > 0 ? (
        <DisplayAllResumes allResumes={allResumes} />
      ) : (
        <p className="min-h-[40vh] lg:min-h-[70vh] flex flex-col items-center justify-center">
          <Image
            alt="no-resumes"
            src="/no-resume.png"
            width={200}
            height={200}
          />
          <span className="text-2xl text-center lg:text-3xl font-semibold text-emerald-500">
            Oops! No resume found. Please create one.
          </span>
        </p>
      )}
    </div>
  );
};

export default Dashboard;
