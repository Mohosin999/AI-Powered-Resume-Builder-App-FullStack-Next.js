// import "@testing-library/jest-dom";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import ExperiencePageClient from "@/app/dashboard/[id]/experiences/experience-page-client";
// import { upsertExperience, deleteExperience } from "@/actions/resume-actions";
// import { toast } from "react-toastify";

// // Mock next/navigation
// jest.mock("next/navigation", () => ({
//   useRouter: () => ({
//     push: jest.fn(),
//     replace: jest.fn(),
//   }),
//   usePathname: () => "/dashboard/resume-123",
//   useSearchParams: () => new URLSearchParams(),
// }));

// // Mock actions
// jest.mock("../../src/actions/resume-actions", () => ({
//   upsertExperience: jest.fn(),
//   deleteExperience: jest.fn(),
// }));

// // Mock toast
// jest.mock("react-toastify", () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// // Mock components
// jest.mock("../../src/components/experience-form-modal", () => ({
//   __esModule: true,
//   ExperienceFormModal: () => <div data-testid="experience-form-modal" />,
// }));

// jest.mock("../../src/components/experience-form", () => ({
//   __esModule: true,
//   ExperienceForm: () => <div data-testid="experience-form" />,
// }));

// jest.mock("../../src/components/delete-confirm-dialog", () => ({
//   __esModule: true,
//   DeleteConfirmDialog: ({ open }: { open: boolean }) =>
//     open ? <div data-testid="delete-confirm-dialog" /> : null,
// }));

// // jest.mock("../../src/components/ui/button", () => ({
// //   __esModule: true,
// //   Button: ({ children, ...props }: any) => (
// //     <button {...props} data-testid="button">
// //       {children}
// //     </button>
// //   ),
// // }));

// jest.mock("../../src/components/ui/loading-button", () => ({
//   __esModule: true,
//   default: ({
//     loading,
//     loadingText,
//     title,
//   }: {
//     loading: boolean;
//     loadingText: string;
//     title: string;
//   }) => (
//     <button data-testid="loading-button">
//       {loading ? loadingText : title}
//     </button>
//   ),
// }));

// jest.mock("../../src/components/ui/text-input", () => ({
//   __esModule: true,
//   default: ({
//     name,
//     id,
//     value,
//     onChange,
//     required,
//     placeholder,
//   }: {
//     name: string;
//     id: string;
//     value: string;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     required: boolean;
//     placeholder: string;
//   }) => (
//     <input
//       data-testid={`input-${name}`}
//       name={name}
//       id={id}
//       value={value}
//       onChange={onChange}
//       required={required}
//       placeholder={placeholder}
//     />
//   ),
// }));

// jest.mock("../../src/components/ui/text-area", () => ({
//   __esModule: true,
//   default: ({
//     name,
//     id,
//     value,
//     onChange,
//     required,
//   }: {
//     name: string;
//     id: string;
//     value: string;
//     onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
//     required: boolean;
//   }) => (
//     <textarea
//       data-testid={`textarea-${name}`}
//       name={name}
//       id={id}
//       value={value}
//       onChange={onChange}
//       required={required}
//     />
//   ),
// }));

// describe("ExperiencePageClient", () => {
//   const mockUpsert = upsertExperience as jest.MockedFunction<
//     typeof upsertExperience
//   >;
//   const mockDelete = deleteExperience as jest.MockedFunction<
//     typeof deleteExperience
//   >;
//   const mockToast = toast as jest.Mocked<typeof toast>;

//   const mockExperiences = [
//     {
//       id: "exp-1",
//       resumeId: "resume-123",
//       jobTitle: "Frontend Developer - React, TypeScript",
//       company: "Tech Corp",
//       location: "Remote",
//       startDate: "2020",
//       endDate: "2022",
//       current: false,
//       description: "Developed web applications using React",
//     },
//     {
//       id: "exp-2",
//       resumeId: "resume-123",
//       jobTitle: "Backend Developer - Node.js, MongoDB",
//       company: "Data Systems",
//       location: "New York, USA",
//       startDate: "2018",
//       endDate: "2020",
//       current: false,
//       description: "Built REST APIs and database systems",
//     },
//   ];

//   const emptyProps = {
//     experiences: [],
//     resumeId: "resume-123",
//   };

//   const withExperiencesProps = {
//     experiences: mockExperiences,
//     resumeId: "resume-123",
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders inline form when no experiences exist", () => {
//     render(<ExperiencePageClient {...emptyProps} />);

//     expect(screen.getByTestId("experience-form")).toBeInTheDocument();
//     expect(
//       screen.queryByTestId("experience-form-modal")
//     ).not.toBeInTheDocument();
//     expect(screen.queryByTestId("loading-button")).not.toBeInTheDocument();
//   });

//   it("renders modal button and experience forms when experiences exist", () => {
//     render(<ExperiencePageClient {...withExperiencesProps} />);

//     expect(screen.getByTestId("experience-form-modal")).toBeInTheDocument();
//     expect(screen.getAllByTestId("loading-button")).toHaveLength(
//       mockExperiences.length
//     );
//     expect(screen.getAllByText("Delete Experience")).toHaveLength(
//       mockExperiences.length
//     );
//   });

//   it("displays correct experience data in form fields", () => {
//     render(<ExperiencePageClient {...withExperiencesProps} />);

//     // First experience
//     expect(screen.getAllByTestId("input-jobTitle")[0]).toHaveValue(
//       "Frontend Developer - React, TypeScript"
//     );
//     expect(screen.getAllByTestId("input-company")[0]).toHaveValue("Tech Corp");
//     expect(screen.getAllByTestId("textarea-description")[0]).toHaveValue(
//       "Developed web applications using React"
//     );

//     // Second experience
//     expect(screen.getAllByTestId("input-jobTitle")[1]).toHaveValue(
//       "Backend Developer - Node.js, MongoDB"
//     );
//   });

//   it("handles form submission successfully", async () => {
//     mockUpsert.mockResolvedValueOnce();
//     render(<ExperiencePageClient {...withExperiencesProps} />);

//     const firstJobTitleInput = screen.getAllByTestId("input-jobTitle")[0];
//     fireEvent.change(firstJobTitleInput, {
//       target: { value: "Senior Frontend Developer" },
//     });
//     fireEvent.submit(firstJobTitleInput.closest("form")!);

//     await waitFor(() => {
//       expect(mockUpsert).toHaveBeenCalled();
//       expect(mockToast.success).toHaveBeenCalledWith(
//         "Updated experience successfully!"
//       );
//     });
//   });

//   it("handles form submission error", async () => {
//     mockUpsert.mockRejectedValueOnce(new Error("Failed to update"));
//     render(<ExperiencePageClient {...withExperiencesProps} />);

//     fireEvent.submit(
//       screen.getAllByTestId("input-jobTitle")[0].closest("form")!
//     );

//     await waitFor(() => {
//       expect(mockToast.error).toHaveBeenCalledWith(
//         "Failed to update experience"
//       );
//     });
//   });

//   it("shows delete confirmation dialog when delete button is clicked", () => {
//     render(<ExperiencePageClient {...withExperiencesProps} />);

//     const deleteButtons = screen.getAllByText("Delete Experience");
//     fireEvent.click(deleteButtons[0]);

//     expect(screen.getByTestId("delete-confirm-dialog")).toBeInTheDocument();
//   });

//   it("enables edit mode when any input changes", () => {
//     render(<ExperiencePageClient {...withExperiencesProps} />);

//     const companyInput = screen.getAllByTestId("input-company")[0];
//     fireEvent.change(companyInput, {
//       target: { value: "New Company Name" },
//     });

//     expect(screen.getAllByTestId("loading-button")[0]).toHaveTextContent(
//       "Update Experience"
//     );
//   });

//   it("renders current job checkbox unchecked by default", () => {
//     render(<ExperiencePageClient {...withExperiencesProps} />);

//     const checkbox = screen.getAllByLabelText("I currently work here")[0];
//     expect(checkbox).toBeInTheDocument();
//     expect(checkbox).not.toBeChecked();
//   });

//   it("renders current job checkbox checked when current is true", () => {
//     const currentJobProps = {
//       experiences: [
//         {
//           ...mockExperiences[0],
//           current: true,
//           endDate: "",
//         },
//       ],
//       resumeId: "resume-123",
//     };

//     render(<ExperiencePageClient {...currentJobProps} />);

//     const checkbox = screen.getByLabelText("I currently work here");
//     expect(checkbox).toBeChecked();
//   });

//   it("displays correct placeholder text for inputs", () => {
//     render(<ExperiencePageClient {...withExperiencesProps} />);

//     expect(screen.getAllByTestId("input-jobTitle")[0]).toHaveAttribute(
//       "placeholder",
//       "Next.js Developer - Next.js, TypeScript, Prisma etc."
//     );
//     expect(screen.getAllByTestId("input-company")[0]).toHaveAttribute(
//       "placeholder",
//       "Google | Freelance"
//     );
//   });
// });
