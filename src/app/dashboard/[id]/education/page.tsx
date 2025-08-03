// import { getEducations } from "@/actions/resume-actions";
// import EducationPageClient from "./education-page-client";

// interface EducationPageProps {
//   params: { id: string };
// }

// export default async function EducationPage({ params }: EducationPageProps) {
//   console.log("params", typeof params.id);
//   const educations = await getEducations(params.id);

//   return <EducationPageClient educations={educations} resumeId={params.id} />;
// }

import { getEducations } from "@/actions/resume-actions";
import EducationPageClient from "./education-page-client";

interface EducationPageProps {
  params: Promise<{ id: string }>;
}

export default async function EducationPage({ params }: EducationPageProps) {
  const { id } = await params;
  const educations = await getEducations(id);
  return <EducationPageClient educations={educations} resumeId={id} />;
}
