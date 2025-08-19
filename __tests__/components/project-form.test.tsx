import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectForm from "@/components/project-form";
import { upsertProject } from "@/actions/resume-actions";
import { toast } from "react-toastify";

// Mock upsertProject
jest.mock("@/actions/resume-actions", () => ({
  upsertProject: jest.fn(),
}));

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock LoadingButton
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

// Mock TextInput
jest.mock("@/components/ui/text-input", () => ({
  __esModule: true,
  default: ({
    name,
    id,
    required,
    placeholder,
    onChange,
  }: {
    name: string;
    id: string;
    required?: boolean;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <input
      data-testid="text-input"
      name={name}
      id={id}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
    />
  ),
}));

// Mock Textarea
jest.mock("@/components/ui/text-area", () => ({
  __esModule: true,
  default: ({
    name,
    id,
    value,
    required,
    onChange,
  }: {
    name: string;
    id: string;
    value: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }) => (
    <textarea
      data-testid="textarea"
      name={name}
      id={id}
      required={required}
      value={value}
      onChange={onChange}
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

describe("ProjectForm", () => {
  const mockResumeId = "resume-101";
  const mockHandleModalClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(
      <ProjectForm
        resumeId={mockResumeId}
        handleModalClose={mockHandleModalClose}
      />
    );

    expect(
      screen.getByPlaceholderText("AI Resume Builder App")
    ).toBeInTheDocument();
    expect(
      screen.getAllByPlaceholderText("https://ai-resume-builder.vercel.app/")[0]
    ).toBeInTheDocument();
    expect(screen.getByText("Add Project")).toBeInTheDocument();
    expect(screen.getByTestId("textarea")).toBeInTheDocument();
  });

  it("submits form successfully and shows success toast", async () => {
    (upsertProject as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <ProjectForm
        resumeId={mockResumeId}
        handleModalClose={mockHandleModalClose}
      />
    );

    // Fill required fields
    fireEvent.change(screen.getByPlaceholderText("AI Resume Builder App"), {
      target: { value: "AI Resume Builder" },
    });

    fireEvent.change(screen.getByTestId("textarea"), {
      target: { value: "Built an AI resume builder application" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Add Project"));

    await waitFor(() => {
      expect(upsertProject).toHaveBeenCalled();
      expect(mockHandleModalClose).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Added project successfully!");
    });
  });

  it("shows error toast when submission fails", async () => {
    (upsertProject as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    render(
      <ProjectForm
        resumeId={mockResumeId}
        handleModalClose={mockHandleModalClose}
      />
    );

    // Fill required fields
    fireEvent.change(screen.getByPlaceholderText("AI Resume Builder App"), {
      target: { value: "AI Resume Builder" },
    });

    fireEvent.change(screen.getByTestId("textarea"), {
      target: { value: "Built an AI resume builder application" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Add Project"));

    await waitFor(() => {
      expect(upsertProject).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Failed to add project");
    });
  });
});
