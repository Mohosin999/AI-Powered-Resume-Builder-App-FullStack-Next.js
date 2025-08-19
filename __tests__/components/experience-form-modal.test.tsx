import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ExperienceFormModal from "@/components/experience-form-modal";

// Mock ExperienceForm
jest.mock("@/components/experience-form", () => ({
  __esModule: true,
  default: ({
    resumeId,
    handleModalClose,
  }: {
    resumeId: string;
    handleModalClose?: () => void;
  }) => (
    <div data-testid="experience-form">
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

describe("ExperienceFormModal", () => {
  const resumeId = "resume-123";

  it("renders Add New Experience button", () => {
    render(<ExperienceFormModal resumeId={resumeId} />);
    expect(screen.getByText("Add New Experience")).toBeInTheDocument();
    expect(screen.getByTestId("fa-plus")).toBeInTheDocument();
  });

  it("opens modal when Add New Experience button is clicked", () => {
    render(<ExperienceFormModal resumeId={resumeId} />);
    fireEvent.click(screen.getByText("Add New Experience"));
    expect(screen.getByTestId("experience-form")).toHaveTextContent(
      `Form for ${resumeId}`
    );
  });

  it("closes modal when close button inside the form is clicked", () => {
    render(<ExperienceFormModal resumeId={resumeId} />);
    fireEvent.click(screen.getByText("Add New Experience"));
    fireEvent.click(screen.getByText("×")); // Close button in modal header
    expect(screen.queryByTestId("experience-form")).not.toBeInTheDocument();
  });

  it("toggles modal open and close when Add New Experience button is clicked twice", () => {
    render(<ExperienceFormModal resumeId={resumeId} />);
    const button = screen.getByText("Add New Experience");

    // Open modal
    fireEvent.click(button);
    expect(screen.getByTestId("experience-form")).toBeInTheDocument();

    // Close modal
    fireEvent.click(button);
    expect(screen.queryByTestId("experience-form")).not.toBeInTheDocument();
  });
});
