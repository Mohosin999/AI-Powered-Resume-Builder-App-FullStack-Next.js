// import { getExperiences } from "@/actions/resume-actions";
// import ExperiencePageClient from "./experience-page-client";

// interface ExperiencePageProps {
//   params: {
//     id: string;
//   };
// }

// export default async function ExperiencePage({ params }: ExperiencePageProps) {
//   const experiences = await getExperiences(params.id);

//   return (
//     <ExperiencePageClient experiences={experiences} resumeId={params.id} />
//   );
// }

import { getExperiences } from "@/actions/resume-actions";
import ExperiencePageClient from "./experience-page-client";

export default async function ExperiencePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const experiences = await getExperiences(id);

  return <ExperiencePageClient experiences={experiences} resumeId={id} />;
}
