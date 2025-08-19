import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { EducationFormModal } from "@/components/education-form-modal";

// Mock EducationForm
jest.mock("@/components/education-form", () => ({
  __esModule: true,
  default: ({
    resumeId,
    handleModalClose,
  }: {
    resumeId: string;
    handleModalClose?: () => void;
  }) => (
    <div data-testid="education-form">
      <p>Form for {resumeId}</p>
      {handleModalClose && <button onClick={handleModalClose}>Close</button>}
    </div>
  ),
}));

// Mock framer-motion fadeInUp
jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: { children: React.ReactNode }) => (
        <div {...props}>{children}</div>
      ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

// Mock react-icons
jest.mock("react-icons/fa6", () => ({
  FaPlus: () => <span data-testid="fa-plus" />,
}));

describe("EducationFormModal", () => {
  const resumeId = "resume-123";

  it("renders Add New Education button", () => {
    render(<EducationFormModal resumeId={resumeId} />);
    expect(screen.getByText("Add New Education")).toBeInTheDocument();
    expect(screen.getByTestId("fa-plus")).toBeInTheDocument();
  });

  it("opens modal when Add New Education button is clicked", () => {
    render(<EducationFormModal resumeId={resumeId} />);

    fireEvent.click(screen.getByText("Add New Education"));
    expect(screen.getByTestId("education-form")).toHaveTextContent(
      `Form for ${resumeId}`
    );
  });

  it("closes modal when close button is clicked", () => {
    render(<EducationFormModal resumeId={resumeId} />);

    fireEvent.click(screen.getByText("Add New Education"));
    fireEvent.click(screen.getByText("×"));
    expect(screen.queryByTestId("education-form")).not.toBeInTheDocument();
  });

  it("toggles modal open and close when button is clicked twice", () => {
    render(<EducationFormModal resumeId={resumeId} />);

    const button = screen.getByText("Add New Education");
    // Open modal
    fireEvent.click(button);
    expect(screen.getByTestId("education-form")).toBeInTheDocument();
    // Close modal
    fireEvent.click(button);
    expect(screen.queryByTestId("education-form")).not.toBeInTheDocument();
  });
});
