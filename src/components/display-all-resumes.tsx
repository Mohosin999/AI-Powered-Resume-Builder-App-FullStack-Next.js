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
import { Resume } from "@/utils/type";
import { Loader } from "lucide-react";
import GoToTop from "./go-to-top";

interface ResumeUpdateProps {
  allResumes: Resume[];
}

const DisplayAllResumes = ({ allResumes }: ResumeUpdateProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Handler function to confirms the deletion of a resume
   */
  const handleDelete = async () => {
    setLoading(true);

    try {
      if (deleteId) {
        await deleteResume(deleteId);
        setDeleteId(null);

        // Show toast message
        toast.success("Resume deleted successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allResumes?.map((resume) => (
          <div
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
          </div>
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

          {/* Buttons */}
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteId(null)}
              className="ghost-btn-2nd"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="ghost-btn-3rd">
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Deleting
                </div>
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/*========================= End of AlertDialog =======================*/}

      {/* Go to top button */}
      <GoToTop />
    </>
  );
};

export default DisplayAllResumes;
