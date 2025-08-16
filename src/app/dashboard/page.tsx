import React from "react";
import Image from "next/image";
import { getResumes } from "@/actions/resume-actions";
import DisplayAllResumes from "@/components/display-all-resumes";
import type { Metadata } from "next";

// Metadata
export const metadata: Metadata = {
  title: "Dashboard | AI Resume Builder",
  description:
    "Manage all your resumes in one place with our AI-powered resume builder. Edit, update, and create professional resumes effortlessly.",
  keywords: [
    "AI Resume Builder",
    "Resume Dashboard",
    "Create Resume",
    "Manage Resumes",
    "Edit Resume",
    "Professional CV Builder",
  ],
};

const Dashboard = async () => {
  const allResumes = await getResumes();

  return (
    <div>
      {allResumes.length > 0 ? (
        <DisplayAllResumes allResumes={allResumes} />
      ) : (
        <p className="min-h-[40vh] lg:min-h-[70vh] flex flex-col items-center justify-center">
          <Image
            alt="Empty dashboard with no resume"
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
