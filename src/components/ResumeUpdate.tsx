"use client";
import React, { useState } from "react";
import { deleteResume, updateResume } from "@/actions/resume-actions";
import Link from "next/link";

interface Resume {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ResumeUpdateProps {
  allResumes: Resume[];
}

const ResumeUpdate = ({ allResumes }: ResumeUpdateProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = async (resumeId: string) => {
    await deleteResume(resumeId);
  };

  return (
    <div className="text-center p-5">
      {allResumes?.map((resume) => (
        <div
          key={resume.id}
          className="border py-5 my-4 bg-gray-900 text-white cursor-pointer relative"
        >
          <Link href={`/dashboard/${resume.id}`}>
            <h1>{resume.title}</h1>
          </Link>

          <span
            className="absolute top-2 right-4 text-xs underline cursor-pointer"
            onClick={() => setEditingId(resume.id)}
          >
            Edit title
          </span>
          <button
            onClick={() => handleDelete(resume.id)}
            className="underline text-red-700"
          >
            Delete
          </button>

          {editingId === resume.id && (
            <form
              action={updateResume}
              className="mt-2 flex justify-center items-center gap-2"
            >
              <input type="hidden" name="id" value={resume.id} />
              <input
                type="text"
                name="title"
                defaultValue={resume.title}
                placeholder="Enter your title"
                className="border px-2 py-1"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResumeUpdate;
