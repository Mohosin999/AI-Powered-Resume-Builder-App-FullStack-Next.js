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
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animation";

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
          <motion.div
            {...fadeInUp}
            key={resume.id}
            className="card lg:!p-8 relative flex flex-col justify-between min-h-[220px]"
          >
            {/* Resume Title */}
            <div>
              <Link href={`/dashboard/${resume.id}/personal-details`}>
                <h2 className="h2 active:scale-105">{resume.title}</h2>
              </Link>
            </div>

            {/* Three-dot menu */}
            <div className="absolute bottom-2 right-2 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-900 dark:text-gray-100 active:scale-105 cursor-pointer">
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
                    className="cursor-pointer"
                    onClick={() => setDeleteId(resume.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}
      </div>

      {/*=====================================================================
      =           AlertDialog For Deleting (Controlled by deleteId)          =
      =====================================================================*/}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent className="card">
          <AlertDialogHeader>
            <AlertDialogTitle className="h2">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="paragraph lg:!text-sm">
              This action cannot be undone. This will permanently delete your
              resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteId(null)}
              className="ghost-btn-2nd"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="ghost-btn-3rd">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/*========================= End of AlertDialog =======================*/}
    </>
  );
};

export default DisplayAllResumes;
