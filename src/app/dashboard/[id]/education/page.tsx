import { getEducations } from "@/actions/resume-actions";
import EducationPageClient from "./education-page-client";
import GoToTop from "@/components/go-to-top";

export default async function EducationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const educations = await getEducations(id);

  return (
    <div>
      <EducationPageClient educations={educations} resumeId={id} />

      {/* Go to top button */}
      <GoToTop />
    </div>
  );
}
