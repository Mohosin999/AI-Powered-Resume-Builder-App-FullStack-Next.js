"use client";
import React, { useState } from "react";
import Link from "next/link";
import { deleteResume } from "@/actions/resume-actions";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

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

const DisplayAllResumes = ({ allResumes }: ResumeUpdateProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteResume(deleteId);
      setDeleteId(null);

      // Show toast message
      toast.success("Resume Deleted Successfully!");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allResumes?.map((resume) => (
          <div
            key={resume.id}
            className="card-style text-white lg:!p-8 relative flex flex-col justify-between min-h-[220px]"
          >
            {/* Resume Title */}
            <div>
              <Link href={`/dashboard/${resume.id}/personal-details`}>
                <h1 className="text-lg font-semibold">{resume.title}</h1>
              </Link>
            </div>

            {/* Three-dot menu */}
            <div className="absolute bottom-2 right-2 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer text-white">
                  <BsThreeDotsVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* Edit Resume */}
                  <Link href={`/dashboard/${resume.id}/personal-details`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  {/* Preview Resume */}
                  <Link href={`/dashboard/${resume.id}/preview-resume`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Preview
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  {/* Download Resume */}
                  <Link href={`/dashboard/${resume.id}/preview-resume`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Download
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600"
                    onClick={() => setDeleteId(resume.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* AlertDialog (Controlled by deleteId) */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent className="bg-[#131A25] border-gray-700 text-gray-100 shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#72839E]">
              This action cannot be undone. This will permanently delete your
              resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteId(null)}
              className="bg-[#131A25] text-emerald-400 border-emerald-400 hover:border-white hover:text-gray-900 cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-white text-gray-900 hover:bg-emerald-400 cursor-pointer"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DisplayAllResumes;
