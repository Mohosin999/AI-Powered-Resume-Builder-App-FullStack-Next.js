import React from "react";
import DashboardPage from "./DashboardPage";
import { getResumes } from "@/actions/resume-actions";
import Link from "next/link";

const Dashboard = async () => {
  const allResumes = await getResumes();
  console.log("all resume", allResumes);

  return (
    <div>
      <DashboardPage />

      <div className="text-center p-20 bg-green-800 text-black">
        {allResumes?.map((resume) => (
          <Link key={resume.id} href={`/dashboard/${resume.id}`}>
            <div className="border py-5 my-2 bg-blue-400 cursor-pointer">
              <h1>{resume.title}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
