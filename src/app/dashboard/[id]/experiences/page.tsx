import React from "react";

interface ExperiencePageProps {
  params: {
    id: string;
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Work Experience</h1>

      {/* Add/Edit Experience Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Your Experiences</h2>

        <form className="space-y-4">
          <input type="hidden" name="resumeId" value={params.id} />
          <input type="hidden" name="id" value="" />
          {/* Will be populated when editing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                name="jobTitle"
                type="text"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                name="company"
                type="text"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              name="location"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                name="startDate"
                type="date"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                name="endDate"
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <div className="mt-2 flex items-center">
                <input
                  id="current"
                  name="current"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="current"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I currently work here
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              rows={4}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Experience
          </button>
        </form>
      </div>
    </div>
  );
}
