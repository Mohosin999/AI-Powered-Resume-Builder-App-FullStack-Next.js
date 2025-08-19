import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EducationForm from "@/components/education-form";
import { upsertEducation } from "@/actions/resume-actions";
import { toast } from "react-toastify";

// Mock upsertEducation
jest.mock("@/actions/resume-actions", () => ({
  upsertEducation: jest.fn(),
}));

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
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
    required,
    placeholder,
  }: {
    name: string;
    id: string;
    required: boolean;
    placeholder: string;
  }) => (
    <input
      data-testid="text-input"
      name={name}
      id={id}
      required={required}
      placeholder={placeholder}
    />
  ),
}));

// Prevent console errors
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("EducationForm", () => {
  const mockResumeId = "resume-101";
  const mockHandleModalClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(
      <EducationForm
        resumeId={mockResumeId}
        handleModalClose={mockHandleModalClose}
      />
    );

    expect(
      screen.getByPlaceholderText("University of California, Los Angeles")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Bachelor")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Computer Science")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("2020")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("2025")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Education/i })
    ).toBeInTheDocument();
  });

  it("submits form successfully and shows success toast", async () => {
    (upsertEducation as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <EducationForm
        resumeId={mockResumeId}
        handleModalClose={mockHandleModalClose}
      />
    );

    // Fill required fields
    fireEvent.change(
      screen.getByPlaceholderText("University of California, Los Angeles"),
      { target: { value: "UCLA" } }
    );

    fireEvent.change(screen.getByPlaceholderText("Bachelor"), {
      target: { value: "Bachelor" },
    });

    fireEvent.change(screen.getByPlaceholderText("2020"), {
      target: { value: "2020" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Add Education"));

    await waitFor(() => {
      expect(upsertEducation).toHaveBeenCalled();
      expect(mockHandleModalClose).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        "Added education successfully!"
      );
    });
  });

  it("shows error toast when submission fails", async () => {
    (upsertEducation as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    render(<EducationForm resumeId="resume-101" />);

    // Fill required fields using placeholders
    fireEvent.change(
      screen.getByPlaceholderText("University of California, Los Angeles"),
      { target: { value: "UCLA" } }
    );
    fireEvent.change(screen.getByPlaceholderText("Bachelor"), {
      target: { value: "Bachelor" },
    });
    fireEvent.change(screen.getByPlaceholderText("2020"), {
      target: { value: "2020" },
    });

    // Click the submit button
    fireEvent.click(screen.getByText("Add Education"));

    // Wait for async logic
    await waitFor(() => {
      expect(upsertEducation).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Failed to add education");
    });
  });
});
