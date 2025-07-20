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
        <p className="min-h-[80vh] flex flex-col items-center justify-center">
          <Image
            alt="no-resumes"
            src="/no-resume.png"
            width={200}
            height={200}
          />
          <span className="text-4xl font-semibold text-emerald-400">
            Oops! No resume found
          </span>
        </p>
      )}
    </div>
  );
};

export default Dashboard;
