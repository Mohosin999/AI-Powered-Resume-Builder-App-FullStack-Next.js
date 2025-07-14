import React from "react";
import { createResume } from "@/actions/resume-actions";

const DashboardPage = () => {
  return (
    <form action={createResume}>
      <input
        type="text"
        name="title"
        placeholder="Enter your title"
        className="border px-2 py-1"
        required
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-1">
        Submit
      </button>
    </form>
  );
};

export default DashboardPage;
