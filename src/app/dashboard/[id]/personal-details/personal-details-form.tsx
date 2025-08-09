"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "@/components/PageHeader";
import { PersonalDetails } from "@/utils/type";
import TextInput from "@/components/ui/text-input";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animation";
import LoadingButton from "@/components/ui/loadingl-button";

interface PersonalDetailsFormProps {
  personalDetails: PersonalDetails;
  resumeId: string;
}

export default function PersonalDetailsForm({
  personalDetails,
  resumeId,
}: PersonalDetailsFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/personal-details", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Details Added Successfully!");
        setIsEditing(false);
      } else {
        toast.error(data.error || "Failed to Save Details.");
      }
    } catch (error: unknown) {
      console.error("Failed to save details:", error);
      toast.error("Failed to Save Details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  return (
    <motion.div {...fadeInUp} className="card">
      <PageHeader
        title="Personal Details"
        resumeId={resumeId}
        nextPage="summary"
        isEditing={isEditing}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden Resume ID */}
        <input type="hidden" name="resumeId" value={resumeId} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="label">
              First Name*
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
              Last Name*
            </label>
            <TextInput
              name="lastName"
              id="lastName"
              value={personalDetails.lastName}
              onChange={handleEditStart}
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
            value={personalDetails.email}
            onChange={handleEditStart}
            placeholder="johndoe@example.com"
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
            value={personalDetails.jobTitle}
            onChange={handleEditStart}
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
            value={personalDetails.socialLink}
            onChange={handleEditStart}
            placeholder="https://www.linkedin.com/in/johndoe"
            required
          />
        </div>

        <div className="flex justify-end">
          <LoadingButton
            loading={loading}
            loadingText="Adding"
            title="Add Details"
          />
        </div>
      </form>
    </motion.div>
  );
}
