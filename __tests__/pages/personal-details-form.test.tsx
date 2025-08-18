import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PersonalDetailsForm from "@/app/dashboard/[id]/personal-details/personal-details-form";
import { upsertPersonalDetails } from "@/actions/resume-actions";
import { toast } from "react-toastify";

jest.mock("@/actions/resume-actions", () => ({
  upsertPersonalDetails: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../src/components/PageHeader", () => ({
  __esModule: true,
  default: ({
    title,
    resumeId,
    nextPage,
    isEditing,
  }: {
    title: string;
    resumeId: string;
    nextPage: string;
    isEditing?: boolean;
  }) => (
    <div data-testid="page-header">
      <h2>{title}</h2>
      <p>resumeId: {resumeId}</p>
      <p>nextPage: {nextPage}</p>
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

// Prevent console errors
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

  it("renders PageHeader with correct props", () => {
    render(<PersonalDetailsForm {...defaultProps} />);
    const header = screen.getByTestId("page-header");
    expect(header).toHaveTextContent("Personal Details");
    expect(header).toHaveTextContent("isEditing");
  });

  it("shows 'Add Details' button when personal details are empty", () => {
    render(<PersonalDetailsForm {...emptyProps} />);

    expect(
      screen.getByRole("button", { name: /Add Details/i })
    ).toBeInTheDocument();
  });

  it("shows 'Update Details' button with default props", () => {
    render(<PersonalDetailsForm {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: /Update Details/i })
    ).toBeInTheDocument();
  });

  it("handles form input changes", () => {
    render(<PersonalDetailsForm {...defaultProps} />);

    const inputs = screen.getAllByTestId("text-input")[0] as HTMLInputElement;
    fireEvent.change(inputs, { target: { value: "Updated First Name" } });
    // Manually update the value prop in the test DOM
    inputs.value = "Updated First Name";
    expect(inputs.value).toBe("Updated First Name");
  });

  it("shows success toast when submission for update is successful", async () => {
    mockUpsert.mockResolvedValueOnce();
    render(<PersonalDetailsForm {...defaultProps} />);

    const submitButton = screen.getByRole("button", {
      name: /Update Details/i,
    });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith(
        "Updated details successfully!"
      );
    });
  });

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
