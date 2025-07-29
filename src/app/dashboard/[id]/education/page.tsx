import { EducationFormModal } from "@/components/education-form-modal";
import { EducationForm } from "@/components/education-form";
import { SubmitButton } from "@/components/ui/submit-button";
import { PageHeader } from "@/components/PageHeader";
import {
  deleteEducation,
  getEducations,
  upsertEducation,
} from "@/actions/resume-actions";

interface EducationPageProps {
  params: {
    id: string;
  };
}

export default async function EducationPage({ params }: EducationPageProps) {
  const educations = await getEducations(params.id);

  return (
    <div className="max-w-4xl mx-auto card-style">
      <PageHeader
        title="Education"
        resumeId={params.id}
        nextPage="projects" // Update to your next page
        showSkip={true}
      />

      {educations.length > 0 ? (
        <div className="mb-6">
          <EducationFormModal resumeId={params.id} />
        </div>
      ) : (
        <div className="bg-[#1C2434] p-6 rounded-lg shadow-md mb-0">
          <h2 className="text-gray-300 text-xl font-semibold mb-4">
            Add New Education
          </h2>
          <EducationForm resumeId={params.id} />
        </div>
      )}

      {educations.length > 0 && (
        <div className="space-y-6">
          {educations.map((edu) => (
            <div key={edu.id} className="p-6 rounded-lg shadow-md">
              <form action={upsertEducation} className="space-y-4">
                <input type="hidden" name="id" value={edu.id} />
                <input type="hidden" name="resumeId" value={params.id} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#72839E] mb-1">
                      Institution *
                    </label>
                    <input
                      name="institution"
                      type="text"
                      defaultValue={edu.institution}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#72839E] mb-1">
                      Degree *
                    </label>
                    <input
                      name="degree"
                      type="text"
                      defaultValue={edu.degree}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#72839E] mb-1">
                    Field of Study
                  </label>
                  <input
                    name="field"
                    type="text"
                    defaultValue={edu.field || ""}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#72839E] mb-1">
                      Start Date *
                    </label>
                    <input
                      name="startDate"
                      type="date"
                      defaultValue={edu.startDate}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#72839E] mb-1">
                      End Date
                    </label>
                    <input
                      name="endDate"
                      type="date"
                      defaultValue={edu.endDate || ""}
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-300"
                    />
                    <div className="mt-2 flex items-center">
                      <input
                        id={`current-${edu.id}`}
                        name="current"
                        type="checkbox"
                        defaultChecked={edu.current}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`current-${edu.id}`}
                        className="ml-2 block text-sm text-[#72839E]"
                      >
                        I currently study here
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <SubmitButton
                    defaultText="Update Education"
                    pendingText="Updating..."
                    successText="Updated"
                  />
                </div>
              </form>

              <form action={deleteEducation}>
                <input type="hidden" name="id" value={edu.id} />
                <SubmitButton
                  defaultText="Delete Education"
                  pendingText="Deleting..."
                  successText="Deleted"
                  className="bg-red-500 hover:bg-red-600 border border-red-500 hover:border-red-600 text-white hover:text-white mt-3"
                />
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
