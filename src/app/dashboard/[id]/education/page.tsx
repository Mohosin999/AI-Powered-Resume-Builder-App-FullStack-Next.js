import { getEducations } from "@/actions/resume-actions";
import EducationPageClient from "./education-page-client";

interface EducationPageProps {
  params: {
    id: string;
  };
}

export default async function EducationPage({ params }: EducationPageProps) {
  const educations = await getEducations(params.id);

  return <EducationPageClient educations={educations} resumeId={params.id} />;
}
