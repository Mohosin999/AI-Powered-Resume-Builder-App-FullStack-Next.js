import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectPageClient from "@/app/dashboard/[id]/projects/project-page-client";
import { upsertProject } from "@/actions/resume-actions";
import { toast } from "react-toastify";

// ==========================
// Mock dependencies
// ==========================
jest.mock("@/actions/resume-actions", () => ({
  upsertProject: jest.fn(),
  deleteProject: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("@/components/project-form-modal", () => ({
  __esModule: true,
  default: ({ resumeId }: { resumeId: string }) => (
    <div data-testid="project-form-modal">Id - {resumeId}</div>
  ),
}));

jest.mock("@/components/project-form", () => ({
  __esModule: true,
  default: ({ resumeId }: { resumeId: string }) => (
    <div data-testid="project-form">Id - {resumeId}</div>
  ),
}));

jest.mock("@/components/PageHeader", () => ({
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

describe("ProjectPageClient", () => {
  const mockUpsert = upsertProject as jest.MockedFunction<typeof upsertProject>;
  const mockToast = toast as jest.Mocked<typeof toast>;

  const mockProjects = [
    {
      id: "1",
      resumeId: "resume-123",
      name: "AI Resume Builder",
      description: "Builds AI-based resumes",
      url: "https://live-project.com",
      repoUrl: "https://github.com/project",
      caseStudyUrl: "https://case-study.com",
    },
  ];

  const resumeId = "resume-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders inline form when no projects exist", () => {
    render(<ProjectPageClient projects={[]} resumeId={resumeId} />);
    expect(screen.getByTestId("project-form")).toBeInTheDocument();
    expect(screen.queryByTestId("project-form-modal")).not.toBeInTheDocument();
  });

  it("renders project form modal when projects exist", () => {
    render(<ProjectPageClient projects={mockProjects} resumeId={resumeId} />);
    expect(screen.queryByTestId("project-form-modal")).toBeInTheDocument();
    expect(screen.queryByTestId("project-form")).not.toBeInTheDocument();
  });

  it("renders PageHeader with correct props", () => {
    render(<ProjectPageClient projects={mockProjects} resumeId={resumeId} />);
    const header = screen.getByTestId("page-header");
    expect(header).toHaveTextContent("Projects");
    expect(header).toHaveTextContent("true"); // showSkip
  });

  it("handles form input changes", () => {
    render(<ProjectPageClient projects={mockProjects} resumeId={resumeId} />);
    const nameInput = screen.getAllByTestId(
      "text-input"
    )[0] as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Updated Project" } });
    nameInput.value = "Updated Project";
    expect(nameInput.value).toBe("Updated Project");

    const descriptionInput = screen.getAllByTestId(
      "text-area"
    )[0] as HTMLTextAreaElement;
    fireEvent.change(descriptionInput, {
      target: { value: "Updated description" },
    });
    descriptionInput.value = "Updated description";
    expect(descriptionInput).toHaveValue("Updated description");
  });

  it("updates project successfully", async () => {
    mockUpsert.mockResolvedValueOnce(undefined);
    render(<ProjectPageClient projects={mockProjects} resumeId={resumeId} />);

    const updateButton = screen.getAllByText("Update Project")[0];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(upsertProject).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        "Updated project successfully!"
      );
    });
  });

  it("shows error toast when update fails", async () => {
    mockUpsert.mockRejectedValueOnce(new Error("Server error"));
    render(<ProjectPageClient projects={mockProjects} resumeId={resumeId} />);

    const updateButton = screen.getAllByText("Update Project")[0];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith("Failed to update project");
    });
  });

  it("renders DeleteConfirmDialog", () => {
    render(<ProjectPageClient projects={mockProjects} resumeId={resumeId} />);
    const deleteDialog = screen.getByTestId("delete-confirm-dialog");
    expect(deleteDialog).toBeInTheDocument();
  });

  it("shows loading state when updating", async () => {
    mockUpsert.mockImplementation(() => new Promise(() => {}));
    render(<ProjectPageClient projects={mockProjects} resumeId={resumeId} />);

    const updateButton = screen.getAllByTestId("loading-button")[0];
    fireEvent.click(updateButton);
    expect(updateButton).toHaveTextContent("Updating");
  });
});
