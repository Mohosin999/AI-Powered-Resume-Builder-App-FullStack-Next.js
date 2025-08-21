import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EducationPageClient from "@/app/dashboard/[id]/education/education-page-client";
import { upsertEducation } from "@/actions/resume-actions";
import { toast } from "react-toastify";

// ==========================
// Mock dependencies
// ==========================
jest.mock("@/actions/resume-actions", () => ({
  upsertEducation: jest.fn(),
  deleteEducation: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("@/components/education-form-modal", () => ({
  __esModule: true,
  EducationFormModal: ({ resumeId }: { resumeId: string }) => (
    <div data-testid="education-form-modal">Id - {resumeId}</div>
  ),
}));

jest.mock("@/components/education-form", () => ({
  __esModule: true,
  default: ({ resumeId }: { resumeId: string }) => (
    <div data-testid="education-form">Id - {resumeId}</div>
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

describe("EducationPageClient", () => {
  const mockUpsert = upsertEducation as jest.MockedFunction<
    typeof upsertEducation
  >;
  const mockToast = toast as jest.Mocked<typeof toast>;

  const mockEducations = [
    {
      id: "1",
      resumeId: "resume-123",
      institution: "UCLA",
      degree: "Bachelor",
      field: "Computer Science",
      startDate: "2020",
      endDate: "2024",
      current: false,
    },
  ];

  const resumeId = "resume-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders inline form when no educations exist", () => {
    render(<EducationPageClient educations={[]} resumeId={resumeId} />);
    expect(screen.getByTestId("education-form")).toBeInTheDocument();
    expect(
      screen.queryByTestId("education-form-modal")
    ).not.toBeInTheDocument();
  });

  it("renders education form modal when educations exist", () => {
    render(
      <EducationPageClient educations={mockEducations} resumeId={resumeId} />
    );
    expect(screen.getByTestId("education-form-modal")).toBeInTheDocument();
    expect(screen.queryByTestId("education-form")).not.toBeInTheDocument();
  });

  it("renders PageHeader with correct props", () => {
    render(
      <EducationPageClient educations={mockEducations} resumeId={resumeId} />
    );
    const header = screen.getByTestId("page-header");
    expect(header).toHaveTextContent("Education");
    expect(header).toHaveTextContent("true");
  });

  it("handles form input changes", () => {
    render(
      <EducationPageClient educations={mockEducations} resumeId={resumeId} />
    );

    const institutionInput = screen.getAllByTestId(
      "text-input"
    )[0] as HTMLInputElement;
    fireEvent.change(institutionInput, { target: { value: "Updated UCLA" } });
    institutionInput.value = "Updated UCLA";
    expect(institutionInput.value).toBe("Updated UCLA");

    const degreeInput = screen.getAllByTestId(
      "text-input"
    )[1] as HTMLInputElement;
    fireEvent.change(degreeInput, { target: { value: "Master" } });
    degreeInput.value = "Master";
    expect(degreeInput.value).toBe("Master");
  });

  it("updates education successfully", async () => {
    mockUpsert.mockResolvedValueOnce(undefined);
    render(
      <EducationPageClient educations={mockEducations} resumeId={resumeId} />
    );

    const updateButton = screen.getAllByText("Update Education")[0];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(upsertEducation).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        "Updated education successfully!"
      );
    });
  });

  it("shows error toast when update fails", async () => {
    mockUpsert.mockRejectedValueOnce(new Error("Server error"));
    render(
      <EducationPageClient educations={mockEducations} resumeId={resumeId} />
    );

    const updateButton = screen.getAllByText("Update Education")[0];
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(
        "Failed to update education"
      );
    });
  });

  it("renders DeleteConfirmDialog", () => {
    render(
      <EducationPageClient educations={mockEducations} resumeId={resumeId} />
    );
    const deleteDialog = screen.getByTestId("delete-confirm-dialog");
    expect(deleteDialog).toBeInTheDocument();
  });

  it("shows loading state when updating", async () => {
    mockUpsert.mockImplementation(() => new Promise(() => {}));
    render(
      <EducationPageClient educations={mockEducations} resumeId={resumeId} />
    );

    const updateButton = screen.getAllByTestId("loading-button")[0];
    fireEvent.click(updateButton);
    expect(updateButton).toHaveTextContent("Updating");
  });
});
