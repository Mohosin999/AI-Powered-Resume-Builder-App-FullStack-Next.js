import { getPersonalDetails } from "@/actions/resume-actions";
import PersonalDetailsForm from "./personal-details-form";

interface PersonalDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function PersonalDetailsPage({
  params,
}: PersonalDetailsPageProps) {
  const personDetailsInfo = await getPersonalDetails(params.id);

  const defaultValues = {
    resumeId: params.id,
    firstName: personDetailsInfo?.firstName || "",
    lastName: personDetailsInfo?.lastName || "",
    email: personDetailsInfo?.email || "",
    phone: personDetailsInfo?.phone || "",
    jobTitle: personDetailsInfo?.jobTitle || "",
    socialLink: personDetailsInfo?.socialLink || "",
  };

  return (
    <div className="max-w-4xl mx-auto card-style">
      <PersonalDetailsForm resumeId={params.id} defaultValues={defaultValues} />
    </div>
  );
}
