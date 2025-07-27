import React from "react";
import {
  getPersonalDetails,
  upsertPersonalDetails,
} from "@/actions/resume-actions";
import { SubmitButton } from "@/components/ui/submit-button";
import NextButton from "@/components/ui/next-button";

interface PersonalDetailsPageProps {
  params: {
    id: string;
  };
}

const PersonalDetailsPage = async ({ params }: PersonalDetailsPageProps) => {
  const personDetailsInfo = await getPersonalDetails(params.id);

  return (
    <div className="max-w-4xl mx-auto card-style">
      {/* Title & Next Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-gray-100 text-2xl font-bold mb-6">
          Personal Details
        </h1>

        <NextButton id={params.id} pageName="experiences" />
      </div>

      {/* Form */}
      <form action={upsertPersonalDetails} className="space-y-6">
        <input type="hidden" name="resumeId" value={params.id} />

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
              defaultValue={personDetailsInfo?.firstName}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-300"
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
              defaultValue={personDetailsInfo?.lastName}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-300"
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
            defaultValue={personDetailsInfo?.email}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-300"
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
            defaultValue={personDetailsInfo?.phone ?? ""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-300"
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
            defaultValue={personDetailsInfo?.jobTitle}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-300"
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
            defaultValue={personDetailsInfo?.socialLink ?? ""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-300"
          />
        </div>

        <div className="flex justify-end">
          <SubmitButton successText="Submitted" />
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsPage;
