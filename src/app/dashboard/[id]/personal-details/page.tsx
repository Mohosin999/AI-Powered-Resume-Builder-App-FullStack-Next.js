import { getPersonalDetails } from "@/actions/resume-actions";
import PersonalDetailsForm from "./personal-details-form";

export default async function PersonalDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const personDetailsInfo = await getPersonalDetails(id);

  const defaultValues = {
    resumeId: id,
    firstName: personDetailsInfo?.firstName || "",
    lastName: personDetailsInfo?.lastName || "",
    email: personDetailsInfo?.email || "",
    phone: personDetailsInfo?.phone || "",
    jobTitle: personDetailsInfo?.jobTitle || "",
    socialLink: personDetailsInfo?.socialLink || "",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PersonalDetailsForm resumeId={id} defaultValues={defaultValues} />
    </div>
  );
}
