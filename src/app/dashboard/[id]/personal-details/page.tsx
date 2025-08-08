import PersonalDetailsForm from "./personal-details-form";

export default async function PersonalDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const defaultValues = {
    resumeId: id,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    socialLink: "",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PersonalDetailsForm resumeId={id} defaultValues={defaultValues} />
    </div>
  );
}
