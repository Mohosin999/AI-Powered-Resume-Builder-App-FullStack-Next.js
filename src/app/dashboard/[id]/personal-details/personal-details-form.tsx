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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-[#72839E]"
          >
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 rounded-md border text-gray-300"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-[#72839E]"
          >
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 rounded-md border text-gray-300"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#72839E]"
        >
          Email *
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 rounded-md border text-gray-300"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[#72839E]"
        >
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formValues.phone}
          onChange={handleChange}
          className="mt-1 block w-full p-2 rounded-md border text-gray-300"
        />
      </div>

      <div>
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-[#72839E]"
        >
          Job Title *
        </label>
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          value={formValues.jobTitle}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 rounded-md border text-gray-300"
        />
      </div>

      <div>
        <label
          htmlFor="socialLink"
          className="block text-sm font-medium text-[#72839E]"
        >
          Social Media Link (LinkedIn, GitHub, etc.)
        </label>
        <input
          type="url"
          name="socialLink"
          id="socialLink"
          value={formValues.socialLink}
          onChange={handleChange}
          className="mt-1 block w-full p-2 rounded-md border text-gray-300"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="outline"
          className="text-gray-900 hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer"
        >
          Add Personal Details
        </Button>
      </div>
    </form>
  );
}
