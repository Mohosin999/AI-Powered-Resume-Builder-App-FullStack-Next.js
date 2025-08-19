import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateResumeDialog from "@/components/create-resume-dialog";
import { toast } from "react-toastify";

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock dependencies
jest.mock("react-icons/fa6", () => ({
  FaPlus: () => <span data-testid="fa-plus-icon" />,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock("@/components/ui/dialog", () => {
  const MockDialog = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  return {
    Dialog: MockDialog,
    DialogTrigger: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DialogContent: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DialogHeader: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DialogTitle: ({ children }: { children: React.ReactNode }) => (
      <h2>{children}</h2>
    ),
    DialogDescription: ({ children }: { children: React.ReactNode }) => (
      <p>{children}</p>
    ),
    DialogFooter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    DialogClose: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

jest.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }: { children: React.ReactNode }) => (
    <label {...props}>{children}</label>
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
    <button data-testid="loading-btn">{loading ? loadingText : title}</button>
  ),
}));

jest.mock("@/components/ui/text-input", () => ({
  __esModule: true,
  default: ({ ...props }: { children: React.ReactNode }) => (
    <input data-testid="text-input" {...props} />
  ),
}));

// Prevent console errors
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("CreateResumeDialog", () => {
  const mockCreateResume = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dialog trigger with icon and text", () => {
    render(<CreateResumeDialog createResume={mockCreateResume} />);
    expect(screen.getByText("Create Resume")).toBeInTheDocument();
    expect(screen.getByTestId("fa-plus-icon")).toBeInTheDocument();
  });

  it("submits form and redirects on success", async () => {
    mockCreateResume.mockResolvedValue("resume-123");

    render(<CreateResumeDialog createResume={mockCreateResume} />);

    const input = screen.getByTestId("text-input");
    const form = input.closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockCreateResume).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        "Resume created successfully!"
      );
    });
  });

  it("shows error toast when createResume fails", async () => {
    mockCreateResume.mockRejectedValue(new Error("Failed"));

    render(<CreateResumeDialog createResume={mockCreateResume} />);

    const input = screen.getByTestId("text-input");
    const form = input.closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to create resume");
    });
  });
});
