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
  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    resumeId: string
  ) => {
    e.preventDefault();
    if (!title.trim()) return;

    await updateResume(resumeId, title);
    setEditingId(null); // close edit form after submission
  };

  const handleDelete = async (resumeId: string) => {
    await deleteResume(resumeId);
  };

  return (
    <div className="text-center p-20 bg-green-800 text-black">
      {allResumes?.map((resume) => (
        <div
          key={resume.id}
          className="border py-5 my-4 bg-blue-400 cursor-pointer rounded-full relative"
        >
          <Link href={`/dashboard/${resume.id}`}>
            <h1>{resume.title}</h1>
          </Link>

          <span
            className="absolute top-2 right-4 text-xs underline cursor-pointer"
            onClick={() => {
              setEditingId(resume.id);
              setTitle(resume.title); // prefill input with existing title
            }}
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
              onSubmit={(e) => handleSubmit(e, resume.id)}
              className="mt-2 flex justify-center items-center gap-2"
            >
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
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
