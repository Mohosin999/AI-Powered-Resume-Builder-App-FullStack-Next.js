import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SummaryForm from "@/app/dashboard/[id]/summary/summary-form";
import { upsertSummary } from "@/actions/resume-actions";
import { toast } from "react-toastify";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => "/dashboard/resume-123",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock actions
jest.mock("../../src/actions/resume-actions", () => ({
  upsertSummary: jest.fn(),
}));

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../src/components/ui/generate-ai-button", () => ({
  __esModule: true,
  default: ({
    onclick,
    loading,
  }: {
    onclick: () => void;
    loading: boolean;
  }) => (
    <button
      onClick={onclick}
      disabled={loading}
      data-testid="generate-ai-button"
    >
      {loading ? "Generating..." : "Generate AI"}
    </button>
  ),
}));

jest.mock("../../src/components/ui/loading-button", () => ({
  __esModule: true,
  default: ({
    loading,
    loadingText,
    title,
  }: {
    loading: boolean;
    loadingText: string;
    title: string;
  }) => (
    <button data-testid="loading-button">
      {loading ? loadingText : title}
    </button>
  ),
}));

jest.mock("../../src/components/ui/text-area", () => ({
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
      data-testid="summary-textarea"
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
    />
  ),
}));

// Mock API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ result: "AI generated summary" }),
  })
) as jest.Mock;

// Stop console error
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("SummaryForm", () => {
  const mockUpsert = upsertSummary as jest.MockedFunction<typeof upsertSummary>;
  const mockToast = toast as jest.Mocked<typeof toast>;

  const defaultProps = {
    resumeId: "resume-123",
    summaryInfo: {
      id: "summary-123",
      resumeId: "resume-123",
      content: "Existing summary content",
    },
    jobTitle: "Software Engineer",
  };

  const emptyProps = {
    resumeId: "resume-123",
    summaryInfo: {
      id: "",
      resumeId: "resume-123",
      content: "",
    },
    jobTitle: "Software Engineer",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default values", () => {
    render(<SummaryForm {...defaultProps} />);

    expect(screen.getByTestId("summary-textarea")).toHaveValue(
      "Existing summary content"
    );
    // expect(screen.getByTestId("page-header-mock")).toBeInTheDocument();
    expect(screen.getByTestId("generate-ai-button")).toBeInTheDocument();
  });

  it("shows 'Add Summary' button when content is empty", () => {
    render(<SummaryForm {...emptyProps} />);
    expect(screen.getByText("Add Summary")).toBeInTheDocument();
  });

  it("updates summary content when typing", () => {
    render(<SummaryForm {...defaultProps} />);
    const textarea = screen.getByTestId("summary-textarea");
    fireEvent.change(textarea, { target: { value: "New content" } });
    expect(textarea).toHaveValue("New content");
  });

  it("submits form successfully", async () => {
    mockUpsert.mockResolvedValueOnce();
    render(<SummaryForm {...defaultProps} />);

    fireEvent.change(screen.getByTestId("summary-textarea"), {
      target: { value: "Updated content" },
    });
    fireEvent.click(screen.getByText("Update Summary"));

    await waitFor(() => {
      expect(mockUpsert).toHaveBeenCalled();
      expect(mockToast.success).toHaveBeenCalledWith(
        "Updated summary successfully!"
      );
    });
  });

  it("handles submission error", async () => {
    mockUpsert.mockRejectedValueOnce(new Error("Submission failed"));
    render(<SummaryForm {...defaultProps} />);

    fireEvent.click(screen.getByText("Update Summary"));

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith("Failed to add summary");
    });
  });
});
