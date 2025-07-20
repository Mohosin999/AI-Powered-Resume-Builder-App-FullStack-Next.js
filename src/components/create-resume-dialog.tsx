"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa6";
import { SubmitButton } from "./ui/submit-button";

export default function CreateResumeDialog({
  createResume,
}: {
  createResume: (formData: FormData) => Promise<string>;
}) {
  const [open, setOpen] = useState(false);

  // Handles the form submission for creating a new resume.
  async function handleAction(formData: FormData) {
    const resumeId = await createResume(formData);
    setOpen(false);

    if (resumeId) {
      window.location.href = `/dashboard/${resumeId}/personal-details`;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <FaPlus className="mr-2" />
          Create New Resume
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={handleAction}>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Enter your resume title to create a new resume.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                defaultValue="Next.js Developer Resume"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
