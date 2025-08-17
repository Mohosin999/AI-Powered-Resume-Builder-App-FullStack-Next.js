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

/** =======================================================================
 *                         Stop console error
 ========================================================================*/
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

/** =======================================================================
 *                             Test cases
 ========================================================================*/
describe("PersonalDetailsForm", () => {
  const mockUpsert = upsertPersonalDetails as jest.MockedFunction<
    typeof upsertPersonalDetails
  >;
  const mockToast = toast as jest.Mocked<typeof toast>;

  const defaultProps = {
    resumeId: "resume-123",
    personalDetails: {
      resumeId: "resume-123",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      jobTitle: "Frontend Developer",
      socialLink: "https://linkedin.com/in/johndoe",
    },
  };

  const emptyProps = {
    resumeId: "resume-123",
    personalDetails: {
      resumeId: "resume-123",
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      socialLink: "",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Render the component
  it("renders all input fields with correct default values", () => {
    render(<PersonalDetailsForm {...defaultProps} />);

    expect(screen.getByLabelText(/First Name \*/i)).toHaveValue("John");
    expect(screen.getByLabelText(/Last Name \*/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/Email \*/i)).toHaveValue("john@example.com");
    expect(screen.getByLabelText(/Job Title \*/i)).toHaveValue(
      "Frontend Developer"
    );
    expect(screen.getByLabelText(/Social Link \*/i)).toHaveValue(
      "https://linkedin.com/in/johndoe"
    );

    expect(
      screen.getByRole("button", { name: /Update Details/i })
    ).toBeInTheDocument();
  });

  // Add Details
  it("shows 'Add Details' button when personal details are empty", () => {
    render(<PersonalDetailsForm {...emptyProps} />);

    expect(
      screen.getByRole("button", { name: /Add Details/i })
    ).toBeInTheDocument();
  });

  // Update Details
  it("submits form data correctly", async () => {
    mockUpsert.mockResolvedValueOnce();

    render(<PersonalDetailsForm {...defaultProps} />);

    const firstNameInput = screen.getByLabelText(/First Name \*/i);
    const submitButton = screen.getByRole("button", {
      name: /Update Details/i,
    });

    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpsert).toHaveBeenCalledTimes(1);

      // Get the FormData that was passed to upsertPersonalDetails
      const formData = mockUpsert.mock.calls[0][0] as FormData;
      expect(formData.get("firstName")).toBe("Jane");
      expect(formData.get("lastName")).toBe("Doe");
      expect(formData.get("resumeId")).toBe("resume-123");

      expect(mockToast.success).toHaveBeenCalledWith(
        "Updated details successfully!"
      );
    });
  });

  // Submission fails
  it("shows error toast when submission fails", async () => {
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
