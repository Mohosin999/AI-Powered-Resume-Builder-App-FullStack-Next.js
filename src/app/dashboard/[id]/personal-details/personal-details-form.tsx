// "use client";

// import { useState } from "react";
// import { upsertPersonalDetails } from "@/actions/resume-actions";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";

// type PersonalDetails = {
//   resumeId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   jobTitle: string;
//   socialLink: string;
// };

// interface PersonalDetailsFormProps {
//   defaultValues: PersonalDetails;
// }

// export default function PersonalDetailsForm({
//   defaultValues,
// }: PersonalDetailsFormProps) {
//   const [formValues, setFormValues] = useState<PersonalDetails>(defaultValues);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (formData: FormData) => {
//     await upsertPersonalDetails(formData);
//     toast.success("Details Added Successfully!");
//   };

//   return (
//     <form action={handleSubmit} className="space-y-6">
//       <input type="hidden" name="resumeId" value={formValues.resumeId} />

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//         <div>
//           <label htmlFor="firstName" className="label-style">
//             First Name *
//           </label>
//           <input
//             type="text"
//             name="firstName"
//             id="firstName"
//             value={formValues.firstName}
//             onChange={handleChange}
//             placeholder="John"
//             required
//             className="input-style"
//           />
//         </div>

//         <div>
//           <label htmlFor="lastName" className="label-style">
//             Last Name *
//           </label>
//           <input
//             type="text"
//             name="lastName"
//             id="lastName"
//             value={formValues.lastName}
//             onChange={handleChange}
//             placeholder="Doe"
//             required
//             className="input-style"
//           />
//         </div>
//       </div>

//       <div>
//         <label htmlFor="email" className="label-style">
//           Email *
//         </label>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           value={formValues.email}
//           onChange={handleChange}
//           placeholder="jhondoe@example.com"
//           required
//           className="input-style"
//         />
//       </div>

//       <div>
//         <label htmlFor="jobTitle" className="label-style">
//           Job Title *
//         </label>
//         <input
//           type="text"
//           name="jobTitle"
//           id="jobTitle"
//           value={formValues.jobTitle}
//           onChange={handleChange}
//           placeholder="MERN Stack Developer"
//           required
//           className="input-style"
//         />
//       </div>

//       <div>
//         <label htmlFor="socialLink" className="label-style">
//           Social Media Link (LinkedIn, GitHub, etc.) *
//         </label>
//         <input
//           type="url"
//           name="socialLink"
//           id="socialLink"
//           value={formValues.socialLink}
//           onChange={handleChange}
//           placeholder="https://www.linkedin.com/in/johndoe"
//           required
//           className="input-style"
//         />
//       </div>

//       <div className="flex justify-end">
//         <Button
//           type="submit"
//           variant="outline"
//           className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
//         >
//           Add Personal Details
//         </Button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { upsertPersonalDetails } from "@/actions/resume-actions";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

type PersonalDetails = {
  resumeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  socialLink: string;
};

interface PersonalDetailsFormProps {
  defaultValues: PersonalDetails;
}

export default function PersonalDetailsForm({
  defaultValues,
}: PersonalDetailsFormProps) {
  const [formValues, setFormValues] = useState<PersonalDetails>(defaultValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (formData: FormData) => {
    await upsertPersonalDetails(formData);
    toast.success("Details Added Successfully!");
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="resumeId" value={formValues.resumeId} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="label-style">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            placeholder="John"
            required
            className="input-style"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="label-style">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
            className="input-style"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="label-style">
          Email *
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="jhondoe@example.com"
          required
          className="input-style"
        />
      </div>

      <div>
        <label htmlFor="jobTitle" className="label-style">
          Job Title *
        </label>
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          value={formValues.jobTitle}
          onChange={handleChange}
          placeholder="MERN Stack Developer"
          required
          className="input-style"
        />
      </div>

      <div>
        <label htmlFor="socialLink" className="label-style">
          Social Media Link (LinkedIn, GitHub, etc.) *
        </label>
        <input
          type="url"
          name="socialLink"
          id="socialLink"
          value={formValues.socialLink}
          onChange={handleChange}
          placeholder="https://www.linkedin.com/in/johndoe"
          required
          className="input-style"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="outline"
          className="w-full lg:w-auto text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
        >
          Add Personal Details
        </Button>
      </div>
    </form>
  );
}
