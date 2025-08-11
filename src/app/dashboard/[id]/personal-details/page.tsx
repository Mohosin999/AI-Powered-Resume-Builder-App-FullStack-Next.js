import { getPersonalDetails } from "@/actions/resume-actions";
import PersonalDetailsForm from "./personal-details-form";
import GoToTop from "@/components/go-to-top";

export default async function PersonalDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const personalDetails = await getPersonalDetails(id);

  // Default values to prevent uncontrolled/controlled warnings by ensuring fields always have a string.
  const defaultValues = {
    resumeId: id,
    firstName: personalDetails?.firstName || "",
    lastName: personalDetails?.lastName || "",
    email: personalDetails?.email || "",
    jobTitle: personalDetails?.jobTitle || "",
    socialLink: personalDetails?.socialLink || "",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PersonalDetailsForm resumeId={id} personalDetails={defaultValues} />

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
}
