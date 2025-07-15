import React from "react";
import DashboardPage from "./DashboardPage";
import { getResumes } from "@/actions/resume-actions";
import ResumeUpdate from "@/components/ResumeUpdate";

const Dashboard = async () => {
  const allResumes = await getResumes();

  return (
    <div>
      <DashboardPage />

      <ResumeUpdate allResumes={allResumes} />
    </div>
  );
};

export default Dashboard;
