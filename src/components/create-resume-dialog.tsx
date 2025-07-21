// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { FaPlus } from "react-icons/fa6";
// import { SubmitButton } from "./ui/submit-button";

// export default function CreateResumeDialog({
//   createResume,
// }: {
//   createResume: (formData: FormData) => Promise<string>;
// }) {
//   const [open, setOpen] = useState(false);

//   // Handles the form submission for creating a new resume.
//   async function handleAction(formData: FormData) {
//     const resumeId = await createResume(formData);
//     setOpen(false);

//     if (resumeId) {
//       window.location.href = `/dashboard/${resumeId}/personal-details`;
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button
//           variant="outline"
//           className="hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
//         >
//           <FaPlus />
//           Create New Resume
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[425px] bg-[#131A25] border-emerald-400 text-gray-100">
//         <form action={handleAction}>
//           <DialogHeader>
//             <DialogTitle>Create New Resume</DialogTitle>
//             <DialogDescription className="text-[#72839E]">
//               Enter your resume title to create a new resume.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="title" className="text-gray-300">
//                 Resume Title{" "}
//                 <span className="text-[#72839E]">(Not Editable)</span>
//               </Label>
//               <Input
//                 id="title"
//                 name="title"
//                 required
//                 placeholder="ex. Frontend Developer Resume"
//               />
//             </div>
//           </div>

//           <DialogFooter className="mt-4">
//             <DialogClose asChild>
//               <Button
//                 type="button"
//                 variant="ghost"
//                 className="homepage-button-style"
//               >
//                 Cancel
//               </Button>
//             </DialogClose>
//             <SubmitButton />
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

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
        <Button
          variant="outline"
          className="hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
        >
          <FaPlus />
          Create New Resume
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-[#131A25] border-gray-700 text-gray-100 shadow-lg">
        <form action={handleAction}>
          <DialogHeader>
            <DialogTitle>Create Your New Resume</DialogTitle>
            <DialogDescription className="text-[#72839E]">
              Enter your actual resume title here as it&apos;s not editable.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-300">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="ex. Frontend Developer Resume"
                required
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="homepage-button-style"
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
