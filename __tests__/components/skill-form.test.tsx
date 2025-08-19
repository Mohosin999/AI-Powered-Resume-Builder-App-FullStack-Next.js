import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SkillForm from "@/components/skill-form";
import { createSkill } from "@/actions/resume-actions";
import { toast } from "react-toastify";

// Mock resume actions
jest.mock("@/actions/resume-actions", () => ({
  createSkill: jest.fn(),
  getResumeById: jest.fn(),
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

// Prevent console errors
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("SkillForm", () => {
  const mockResumeId = "resume-101";

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders input and add button", () => {
    render(<SkillForm resumeId={mockResumeId} />);

    expect(screen.getByPlaceholderText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Add Skill")).toBeInTheDocument();
  });

  it("submits form successfully and shows success toast", async () => {
    (createSkill as jest.Mock).mockResolvedValueOnce(undefined);

    render(<SkillForm resumeId={mockResumeId} />);

    fireEvent.change(screen.getByPlaceholderText("JavaScript"), {
      target: { value: "React" },
    });

    fireEvent.click(screen.getByText("Add Skill"));

    await waitFor(() => {
      expect(createSkill).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Added skill successfully!");
      expect(screen.getByPlaceholderText("JavaScript")).toHaveValue("");
    });
  });

  it("shows error toast when submission fails", async () => {
    (createSkill as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    render(<SkillForm resumeId={mockResumeId} />);

    fireEvent.change(screen.getByPlaceholderText("JavaScript"), {
      target: { value: "React" },
    });

    fireEvent.click(screen.getByText("Add Skill"));

    await waitFor(() => {
      expect(createSkill).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Failed to add skill");
    });
  });

  it("displays AI suggestions from localStorage", async () => {
    localStorage.setItem(
      `skills-${mockResumeId}`,
      JSON.stringify(["JavaScript", "TypeScript"])
    );

    render(<SkillForm resumeId={mockResumeId} />);

    expect(await screen.findByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("fills input when suggestion is clicked", async () => {
    localStorage.setItem(`skills-${mockResumeId}`, JSON.stringify(["React"]));

    render(<SkillForm resumeId={mockResumeId} />);

    // Click the suggestion button
    fireEvent.click(await screen.findByText("React"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("JavaScript")).toHaveValue("React");
    });
  });
});
