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
import { toast } from "react-toastify";

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

    // Show toast message
    toast.success("Resume Created Successfully!");

    if (resumeId) {
      window.location.href = `/dashboard/${resumeId}/personal-details`;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="ghost-btn-3rd">
          <FaPlus />
          Create Resume
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px] card">
        <form action={handleAction}>
          <DialogHeader>
            <DialogTitle className="h2">Create Your New Resume</DialogTitle>
            <DialogDescription className="paragraph lg:!text-sm">
              Enter your actual resume title here as it&apos;s not editable.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="label">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="ex. MERN Stack Developer"
                required
                className="input"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="ghost-btn-2nd">
                Cancel
              </Button>
            </DialogClose>
            {/* <SubmitButton /> */}
            <Button type="submit" variant="ghost" className="ghost-btn-3rd">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
