import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PersonalDetailsForm from "@/app/dashboard/[id]/personal-details/personal-details-form";
import { upsertPersonalDetails } from "@/actions/resume-actions";
import { toast } from "react-toastify";

// Mock upsertPersonalDetails
jest.mock("../../src/actions/resume-actions", () => ({
  upsertPersonalDetails: jest.fn(),
}));

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Stop console error
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("PersonalDetailsForm", () => {
  const mockUpsert = upsertPersonalDetails as jest.MockedFunction<
    typeof upsertPersonalDetails
  >;
  const mockToast = toast as jest.Mocked<typeof toast>;

  const defaultProps = {
    resumeId: "resume-123",
    personalDetails: {
      resumeId: "resume-123", // add this
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      jobTitle: "Frontend Developer",
      socialLink: "https://linkedin.com/in/johndoe",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all input fields with correct default values", () => {
    render(<PersonalDetailsForm {...defaultProps} />);

    expect(screen.getByLabelText(/First Name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("john@example.com");
    expect(screen.getByLabelText(/Job Title/i)).toHaveValue(
      "Frontend Developer"
    );
    expect(screen.getByLabelText(/Social Link/i)).toHaveValue(
      "https://linkedin.com/in/johndoe"
    );
  });

  it("calls upsertPersonalDetails and shows success toast on submit", async () => {
    mockUpsert.mockResolvedValueOnce(); // simulate API success

    render(<PersonalDetailsForm {...defaultProps} />);

    // const form = screen.getByRole("form"); // form role not automatically added, so we may use getByText on submit button instead
    const submitButton = screen.getByRole("button", {
      name: /Update Details/i,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpsert).toHaveBeenCalledTimes(1);
      expect(mockToast.success).toHaveBeenCalledWith(
        "Updated details successfully!"
      );
    });
  });

  it("shows error toast if upsertPersonalDetails fails", async () => {
    mockUpsert.mockRejectedValueOnce(new Error("API error"));

    render(<PersonalDetailsForm {...defaultProps} />);

    const submitButton = screen.getByRole("button", {
      name: /Update Details/i,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith("Failed to save details");
    });
  });
});
