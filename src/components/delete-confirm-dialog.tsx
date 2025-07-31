"use client";
import React from "react";
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

interface DeleteConfirmDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string | null;
  resumeId: string;
  deleteAction: (formData: FormData) => Promise<void>;
  description?: string;
}

const DeleteConfirmDialog = ({
  open,
  setOpen,
  id,
  resumeId,
  deleteAction,
  description = "This action cannot be undone. This will permanently delete the item.",
}: DeleteConfirmDialogProps) => {
  const handleDelete = async () => {
    if (!id) return;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("resumeId", resumeId);

    await deleteAction(formData);
    setOpen(false);

    // Show toast message
    toast.success("Deleted Successfully!");
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => setOpen(v)}>
      <AlertDialogContent className="bg-[#131A25] border-gray-700 text-gray-100 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-[#72839E]">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
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
  );
};

export default DeleteConfirmDialog;
