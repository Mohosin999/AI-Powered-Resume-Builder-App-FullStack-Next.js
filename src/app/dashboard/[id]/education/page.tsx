import { getEducations } from "@/actions/resume-actions";
import EducationPageClient from "./education-page-client";

export default async function EducationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const educations = await getEducations(id);
  return <EducationPageClient educations={educations} resumeId={id} />;
}
