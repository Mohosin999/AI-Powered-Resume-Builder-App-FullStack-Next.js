// "use client";
// import { useState } from "react";
// import { upsertPersonalDetails } from "@/actions/resume-actions";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { PageHeader } from "@/components/PageHeader";
// import { PersonalDetails } from "@/lib/type";
// import TextInput from "@/components/ui/text-input";
// import { motion } from "framer-motion";
// import { fadeInUp } from "@/lib/helper";

// interface PersonalDetailsFormProps {
//   defaultValues: PersonalDetails;
//   resumeId: string;
// }

// export default function PersonalDetailsForm({
//   defaultValues,
//   resumeId,
// }: PersonalDetailsFormProps) {
//   const [formValues, setFormValues] = useState<PersonalDetails>(defaultValues);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEditStart = () => {
//     setIsEditing(true);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     await upsertPersonalDetails(formData);
//     toast.success("Details Added Successfully!");
//     setIsEditing(false);
//   };

//   return (
//     <motion.div {...fadeInUp} className="card">
//       <PageHeader
//         title="Personal Details"
//         resumeId={resumeId}
//         nextPage="summary"
//         isEditing={isEditing}
//       />

//       <form
//         onSubmit={handleSubmit}
//         onChange={handleEditStart}
//         className="space-y-6"
//       >
//         <input type="hidden" name="resumeId" value={formValues.resumeId} />

//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <div>
//             <label htmlFor="firstName" className="label">
//               First Name*
//             </label>
//             <TextInput
//               name="firstName"
//               id="firstName"
//               value={formValues.firstName}
//               onChange={handleChange}
//               placeholder="John"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="lastName" className="label">
//               Last Name*
//             </label>
//             <TextInput
//               name="lastName"
//               id="lastName"
//               value={formValues.lastName}
//               onChange={handleChange}
//               placeholder="Doe"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="email" className="label">
//             Email*
//           </label>
//           <TextInput
//             type="email"
//             name="email"
//             id="email"
//             value={formValues.email}
//             onChange={handleChange}
//             placeholder="jhondoe@example.com"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="jobTitle" className="label">
//             Job Title*
//           </label>

//           <TextInput
//             name="jobTitle"
//             id="jobTitle"
//             value={formValues.jobTitle}
//             onChange={handleChange}
//             placeholder="FullStack Developer"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="socialLink" className="label">
//             Social Link*
//           </label>
//           <TextInput
//             type="url"
//             name="socialLink"
//             id="socialLink"
//             value={formValues.socialLink}
//             onChange={handleChange}
//             placeholder="https://www.linkedin.com/in/johndoer"
//             required
//           />
//         </div>

//         <div className="flex justify-end">
//           <Button type="submit" variant="ghost" className="ghost-btn-3rd">
//             Add Details
//           </Button>
//         </div>
//       </form>
//     </motion.div>
//   );
// }

"use client";
import { useState } from "react";
import { upsertPersonalDetails } from "@/actions/resume-actions";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { PageHeader } from "@/components/PageHeader";
import { PersonalDetails } from "@/lib/type";
import TextInput from "@/components/ui/text-input";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/helper";

interface PersonalDetailsFormProps {
  defaultValues: PersonalDetails;
  resumeId: string;
}

export default function PersonalDetailsForm({
  defaultValues,
  resumeId,
}: PersonalDetailsFormProps) {
  const [formValues, setFormValues] = useState<PersonalDetails>(defaultValues);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnChangle = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setIsEditing(true);
  };

  // const handleEditStart = () => {
  //   setIsEditing(true);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await upsertPersonalDetails(formData);
      toast.success("Details Added Successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving details:", error);
      toast.error("Failed to save details");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <motion.div {...fadeInUp} className="card">
      <PageHeader
        title="Personal Details"
        resumeId={resumeId}
        nextPage="summary"
        isEditing={isEditing}
      />

      <form
        onSubmit={handleSubmit}
        // onChange={handleEditStart}
        className="space-y-6"
      >
        <input type="hidden" name="resumeId" value={formValues.resumeId} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="label">
              First Name*
            </label>
            <TextInput
              name="firstName"
              id="firstName"
              value={formValues.firstName}
              onChange={handleOnChangle}
              placeholder="John"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="label">
              Last Name*
            </label>
            <TextInput
              name="lastName"
              id="lastName"
              value={formValues.lastName}
              onChange={handleOnChangle}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="label">
            Email*
          </label>
          <TextInput
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleOnChangle}
            placeholder="jhondoe@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className="label">
            Job Title*
          </label>

          <TextInput
            name="jobTitle"
            id="jobTitle"
            value={formValues.jobTitle}
            onChange={handleOnChangle}
            placeholder="FullStack Developer"
            required
          />
        </div>

        <div>
          <label htmlFor="socialLink" className="label">
            Social Link*
          </label>
          <TextInput
            type="url"
            name="socialLink"
            id="socialLink"
            value={formValues.socialLink}
            onChange={handleOnChangle}
            placeholder="https://www.linkedin.com/in/johndoer"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="ghost"
            className="ghost-btn-3rd"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Add Details"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
