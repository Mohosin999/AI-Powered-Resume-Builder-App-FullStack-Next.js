import React from "react";
import { getResumes } from "@/actions/resume-actions";
import ResumeUpdate from "@/components/ResumeUpdate";

const Dashboard = async () => {
  const allResumes = await getResumes();

  return (
    <div>
      <ResumeUpdate allResumes={allResumes} />
    </div>
  );
};

export default Dashboard;
