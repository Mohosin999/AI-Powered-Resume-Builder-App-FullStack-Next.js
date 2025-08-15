"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "@/components/PageHeader";
import { PersonalDetails } from "@/utils/type";
import TextInput from "@/components/ui/text-input";
import LoadingButton from "@/components/ui/loading-button";
import { upsertPersonalDetails } from "@/actions/resume-actions";

interface PersonalDetailsFormProps {
  personalDetails: PersonalDetails;
  resumeId: string;
}

const PersonalDetailsForm = ({
  personalDetails,
  resumeId,
}: PersonalDetailsFormProps) => {
  const [isEditing, setIsEditing] = useState(!personalDetails?.firstName);
  const [loading, setLoading] = useState(false);

  // Determine if we're adding new details or updating existing ones
  const isAddingNew = !personalDetails?.firstName;

  /**
   * Handles form submission
   * Updates personal details
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get form data
      const formData = new FormData(e.currentTarget);

      // Update personal details
      await upsertPersonalDetails(formData);

      if (isAddingNew) {
        toast.success("Added details successfully!");
      } else {
        toast.success("Updated details successfully!");
      }

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save details");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle editing start: sets the editing state to true
   */
  const handleEditStart = () => {
    setIsEditing(true);
  };

  return (
    <div className="card">
      <PageHeader
        title="Personal Details"
        resumeId={resumeId}
        nextPage="summary"
        isEditing={isEditing}
      />

      {/*=====================================================================
        =                          Form section                               =
      ======================================================================*/}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden resume ID */}
        <input type="hidden" name="resumeId" value={resumeId} />

        {/* First and last name */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="label">
              First Name *
            </label>
            <TextInput
              name="firstName"
              id="firstName"
              value={personalDetails?.firstName}
              onChange={handleEditStart}
              placeholder="John"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="label">
              Last Name *
            </label>
            <TextInput
              name="lastName"
              id="lastName"
              value={personalDetails?.lastName}
              onChange={handleEditStart}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label">
            Email *
          </label>
          <TextInput
            type="email"
            name="email"
            id="email"
            value={personalDetails?.email}
            onChange={handleEditStart}
            placeholder="johndoe@example.com"
            required
          />
        </div>

        {/* Job title */}
        <div>
          <label htmlFor="jobTitle" className="label">
            Job Title *
          </label>
          <TextInput
            name="jobTitle"
            id="jobTitle"
            value={personalDetails?.jobTitle}
            onChange={handleEditStart}
            placeholder="FullStack Developer"
            required
          />
        </div>

        {/* Social link */}
        <div>
          <label htmlFor="socialLink" className="label">
            Social Link *
          </label>
          <TextInput
            type="url"
            name="socialLink"
            id="socialLink"
            value={personalDetails?.socialLink}
            onChange={handleEditStart}
            placeholder="https://www.linkedin.com/in/johndoe"
            required
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <LoadingButton
            loading={loading}
            loadingText={isAddingNew ? "Adding" : "Updating"}
            title={isAddingNew ? "Add Details" : "Update Details"}
          />
        </div>
      </form>
      {/*======================= End of form section ========================*/}
    </div>
  );
};

export default PersonalDetailsForm;
