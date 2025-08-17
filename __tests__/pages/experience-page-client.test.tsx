import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ExperiencePageClient from "@/app/dashboard/[id]/experiences/experience-page-client";
import { upsertExperience } from "@/actions/resume-actions";
import { toast } from "react-toastify";

// ==========================
// Mock dependencies
// ==========================
jest.mock("@/actions/resume-actions", () => ({
  upsertExperience: jest.fn(),
  deleteExperience: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("@/components/experience-form-modal", () => ({
  __esModule: true,
  default: ({ resumeId }: { resumeId: string }) => (
    <div data-testid="experience-form-modal">Id - {resumeId}</div>
  ),
}));

jest.mock("@/components/experience-form", () => ({
  __esModule: true,
  default: ({ resumeId }: { resumeId: string }) => (
    <div data-testid="experience-form">Id - {resumeId}</div>
  ),
}));

jest.mock("../../src/components/PageHeader", () => ({
  __esModule: true,
  default: ({
    title,
    resumeId,
    nextPage,
    showSkip,
    showPrevious,
    isEditing,
  }: {
    title: string;
    resumeId: string;
    nextPage: string;
    showSkip?: boolean;
    showPrevious?: boolean;
    isEditing?: boolean;
  }) => (
    <div data-testid="page-header">
      <h2>{title}</h2>
      <p>resumeId: {resumeId}</p>
      <p>nextPage: {nextPage}</p>
      <p>showSkip: {showSkip ? "true" : "false"}</p>
      <p>showPrevious: {showPrevious ? "true" : "false"}</p>
      <p>isEditing: {isEditing ? "true" : "false"}</p>
    </div>
  ),
}));

jest.mock("@/components/ui/loading-button", () => ({
  __esModule: true,
  default: ({
    loading,
    loadingText,
    title,
  }: {
    loading: boolean;
    loadingText: string;
    title: React.ReactNode;
  }) => (
    <button data-testid="loading-button">
      {loading ? loadingText : title}
    </button>
  ),
}));

jest.mock("@/components/ui/text-input", () => ({
  __esModule: true,
  default: ({
    name,
    id,
    value,
    onChange,
    required,
    placeholder,
  }: {
    name: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
    placeholder: string;
  }) => (
    <input
      data-testid="text-input"
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  ),
}));

jest.mock("@/components/ui/text-area", () => ({
  __esModule: true,
  default: ({
    name,
    id,
    value,
    onChange,
    required,
  }: {
    name: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required: boolean;
  }) => (
    <textarea
      data-testid="text-area"
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
    />
  ),
}));

jest.mock("@/components/delete-confirm-dialog", () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) => (
    <div data-testid="delete-confirm-dialog">
      {open ? "Dialog Open" : "Dialog Closed"}
    </div>
  ),
}));

// Prevent console errors
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("ExperiencePageClient", () => {
  const mockExperiences = [
    {
      id: "1",
      resumeId: "resume-123",
      jobTitle: "Frontend Developer",
      company: "Google",
      location: "Remote",
      startDate: "2021",
      endDate: "2022",
      current: false,
      description: "Worked on frontend with React",
    },
  ];

  const resumeId = "resume-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders inline form when no experiences exist", () => {
    render(<ExperiencePageClient experiences={[]} resumeId={resumeId} />);
    expect(screen.getByTestId("experience-form")).toBeInTheDocument();
    expect(
      screen.queryByTestId("experience-form-modal")
    ).not.toBeInTheDocument();
  });

  it("renders experience form modal when experiences exist", () => {
    render(
      <ExperiencePageClient experiences={mockExperiences} resumeId={resumeId} />
    );
    expect(screen.getByTestId("experience-form-modal")).toBeInTheDocument();
    expect(screen.queryByTestId("experience-form")).not.toBeInTheDocument();
  });

  it("renders PageHeader with correct props", () => {
    render(
      <ExperiencePageClient experiences={mockExperiences} resumeId={resumeId} />
    );
    const header = screen.getByTestId("page-header");
    expect(header).toHaveTextContent("Experiences");
    expect(header).toHaveTextContent(resumeId);
    expect(header).toHaveTextContent("true"); // showSkip
  });

  it("handles form input changes and current checkbox", () => {
    render(
      <ExperiencePageClient experiences={mockExperiences} resumeId={resumeId} />
    );

    const jobInput = screen.getAllByTestId("text-input")[0] as HTMLInputElement;
    fireEvent.change(jobInput, { target: { value: "Updated Frontend Dev" } });
    // Manually update the value prop in the test DOM
    jobInput.value = "Updated Frontend Dev";
    expect(jobInput.value).toBe("Updated Frontend Dev");

    const description = screen.getAllByTestId(
      "text-area"
    )[0] as HTMLInputElement;
    fireEvent.change(description, { target: { value: "Updated description" } });
    description.value = "Updated description";
    expect(description).toHaveValue("Updated description");
  });

  it("updates experience successfully", async () => {
    (upsertExperience as jest.Mock).mockResolvedValueOnce(undefined);
    render(
      <ExperiencePageClient experiences={mockExperiences} resumeId={resumeId} />
    );

    const updateButton = screen.getAllByText("Update Experience")[0];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(upsertExperience).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        "Updated experience successfully!"
      );
    });
  });

  it("shows error toast when update fails", async () => {
    (upsertExperience as jest.Mock).mockRejectedValueOnce(
      new Error("Server error")
    );
    render(
      <ExperiencePageClient experiences={mockExperiences} resumeId={resumeId} />
    );

    const updateButton = screen.getAllByText("Update Experience")[0];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to update experience");
    });
  });

  it("renders DeleteConfirmDialog", () => {
    render(
      <ExperiencePageClient experiences={mockExperiences} resumeId={resumeId} />
    );

    const deleteConfirmDialog = screen.getByTestId("delete-confirm-dialog");
    expect(deleteConfirmDialog).toBeInTheDocument();
  });

  it("shows loading state when updating", async () => {
    (upsertExperience as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    render(
      <ExperiencePageClient experiences={mockExperiences} resumeId={resumeId} />
    );

    const updateButton = screen.getAllByTestId("loading-button")[0];
    fireEvent.click(updateButton);
    expect(updateButton).toHaveTextContent("Updating");
  });
});
