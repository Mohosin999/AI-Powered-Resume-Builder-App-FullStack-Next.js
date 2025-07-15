import React from "react";
import DashboardPage from "./DashboardPage";
import { getResumes } from "@/actions/resume-actions";
import ResumeUpdate from "@/components/ResumeUpdate";

const Dashboard = async () => {
  const allResumes = await getResumes();
  console.log("all resume", allResumes);

  return (
    <div>
      <DashboardPage />

      <ResumeUpdate allResumes={allResumes} />
    </div>
  );
};

export default Dashboard;
