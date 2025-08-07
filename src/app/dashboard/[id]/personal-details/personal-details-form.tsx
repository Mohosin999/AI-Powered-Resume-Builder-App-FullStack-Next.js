"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "@/components/PageHeader";
import { PersonalDetails } from "@/utils/type";
import TextInput from "@/components/ui/text-input";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animation";
import LoadingButton from "@/components/ui/loadingl-button";

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
  const [loading, setLoading] = useState(false);

  // Fetch personal details from API on mount
  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const res = await fetch(`/api/personal-details?resumeId=${resumeId}`);
        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Failed to fetch");

        if (result.data) {
          setFormValues(result.data);
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch personal details.";

        toast.error(errorMessage || "Failed to fetch personal details.");
      }
    };

    fetchPersonalDetails();
  }, [resumeId]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("firstName", formValues.firstName);
    formData.append("lastName", formValues.lastName);
    formData.append("email", formValues.email);
    formData.append("jobTitle", formValues.jobTitle);
    formData.append("socialLink", formValues.socialLink);

    try {
      const res = await fetch("/api/personal-details", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Submission failed");

      toast.success("Details saved successfully!");
      setIsEditing(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch personal details.";

      toast.error(errorMessage || "Failed to save details.");
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <Loader />;

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
