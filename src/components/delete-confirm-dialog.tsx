"use client";

import React, { useState } from "react";
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
import { Loader } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

  // Handler function to delete
  const handleDelete = async () => {
    if (!id) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("resumeId", resumeId);

      await deleteAction(formData);
      setOpen(false);

      // Show toast message
      toast.success("Deleted Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => setOpen(v)}>
      <AlertDialogContent className="card">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-[#72839E]">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Buttons */}
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
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
  );
};

export default DeleteConfirmDialog;
