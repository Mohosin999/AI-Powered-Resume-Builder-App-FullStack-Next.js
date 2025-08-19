import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog";
import { toast } from "react-toastify";

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Prevent console errors
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("DeleteConfirmDialog", () => {
  const mockSetOpen = jest.fn();
  const mockDeleteAction = jest.fn();

  const defaultProps = {
    open: true,
    setOpen: mockSetOpen,
    id: "123",
    resumeId: "resume-1",
    deleteAction: mockDeleteAction,
    description: "Custom delete message",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dialog with title and description", () => {
    render(<DeleteConfirmDialog {...defaultProps} />);

    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
    expect(screen.getByText("Custom delete message")).toBeInTheDocument();
  });

  it("calls setOpen(false) when Cancel is clicked", () => {
    render(<DeleteConfirmDialog {...defaultProps} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("calls deleteAction and shows success toast on successful delete", async () => {
    mockDeleteAction.mockResolvedValueOnce(undefined);
    render(<DeleteConfirmDialog {...defaultProps} />);

    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockDeleteAction).toHaveBeenCalled();
      expect(mockSetOpen).toHaveBeenCalledWith(false);
      expect(toast.success).toHaveBeenCalledWith("Deleted Successfully!");
    });
  });

  it("shows error toast when deleteAction fails", async () => {
    mockDeleteAction.mockRejectedValueOnce(new Error("Delete failed"));

    render(<DeleteConfirmDialog {...defaultProps} />);
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(() => {
      expect(mockDeleteAction).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Failed to delete");
    });
  });

  it("does not call deleteAction if id is null", async () => {
    render(<DeleteConfirmDialog {...defaultProps} id={null} />);

    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
      expect(mockDeleteAction).not.toHaveBeenCalled();
    });
  });
});
