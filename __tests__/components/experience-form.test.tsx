import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ExperienceForm from "@/components/experience-form";
import { upsertExperience } from "@/actions/resume-actions";
import { toast } from "react-toastify";

// Mock upsertExperience
jest.mock("@/actions/resume-actions", () => ({
  upsertExperience: jest.fn(),
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

describe("ExperienceForm", () => {
  const mockResumeId = "resume-101";
  const mockHandleModalClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(
      <ExperienceForm
        resumeId={mockResumeId}
        handleModalClose={mockHandleModalClose}
      />
    );

    expect(
      screen.getByPlaceholderText(
        "Next.js Developer - Next.js, TypeScript, Prisma etc."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Google | Freelance")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("San Francisco, USA | Remote")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("2024")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("2025")).toBeInTheDocument();
    expect(screen.getByText("Add Experience")).toBeInTheDocument();
  });

  it("submits form successfully and shows success toast", async () => {
    (upsertExperience as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <ExperienceForm
        resumeId={mockResumeId}
        handleModalClose={mockHandleModalClose}
      />
    );

    // Fill required fields
    fireEvent.change(
      screen.getByPlaceholderText(
        "Next.js Developer - Next.js, TypeScript, Prisma etc."
      ),
      { target: { value: "Frontend Developer - React, TypeScript" } }
    );

    fireEvent.change(screen.getByPlaceholderText("Google | Freelance"), {
      target: { value: "Google" },
    });

    fireEvent.change(screen.getByPlaceholderText("2024"), {
      target: { value: "2024" },
    });

    fireEvent.change(screen.getByTestId("textarea"), {
      target: { value: "Worked on various projects" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Add Experience"));

    await waitFor(() => {
      expect(upsertExperience).toHaveBeenCalled();
      expect(mockHandleModalClose).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        "Added experience Successfully!"
      );
    });
  });

  it("shows error toast when submission fails", async () => {
    (upsertExperience as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    render(
      <ExperienceForm
        resumeId={mockResumeId}
        handleModalClose={mockHandleModalClose}
      />
    );

    // Fill required fields
    fireEvent.change(
      screen.getByPlaceholderText(
        "Next.js Developer - Next.js, TypeScript, Prisma etc."
      ),
      { target: { value: "Frontend Developer - React, TypeScript" } }
    );

    fireEvent.change(screen.getByPlaceholderText("Google | Freelance"), {
      target: { value: "Google" },
    });

    fireEvent.change(screen.getByPlaceholderText("2024"), {
      target: { value: "2024" },
    });

    fireEvent.change(screen.getByTestId("textarea"), {
      target: { value: "Worked on various projects" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Add Experience"));

    await waitFor(() => {
      expect(upsertExperience).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Failed to add experience");
    });
  });
});
