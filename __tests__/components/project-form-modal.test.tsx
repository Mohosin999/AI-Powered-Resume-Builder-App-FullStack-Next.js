import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectFormModal from "@/components/project-form-modal";

// Mock ProjectForm
jest.mock("@/components/project-form", () => ({
  __esModule: true,
  default: ({
    resumeId,
    handleModalClose,
  }: {
    resumeId: string;
    handleModalClose?: () => void;
  }) => (
    <div data-testid="project-form">
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

describe("ProjectFormModal", () => {
  const resumeId = "resume-123";

  it("renders Add New Project button", () => {
    render(<ProjectFormModal resumeId={resumeId} />);
    expect(screen.getByText("Add New Project")).toBeInTheDocument();
    expect(screen.getByTestId("fa-plus")).toBeInTheDocument();
  });

  it("opens modal when Add New Project button is clicked", () => {
    render(<ProjectFormModal resumeId={resumeId} />);
    fireEvent.click(screen.getByText("Add New Project"));
    expect(screen.getByTestId("project-form")).toHaveTextContent(
      `Form for ${resumeId}`
    );
  });

  it("closes modal when close button in modal header is clicked", () => {
    render(<ProjectFormModal resumeId={resumeId} />);
    fireEvent.click(screen.getByText("Add New Project"));
    fireEvent.click(screen.getByText("×")); // Close button in header
    expect(screen.queryByTestId("project-form")).not.toBeInTheDocument();
  });

  it("toggles modal open and close when Add New Project button is clicked twice", () => {
    render(<ProjectFormModal resumeId={resumeId} />);
    const button = screen.getByText("Add New Project");

    // Open modal
    fireEvent.click(button);
    expect(screen.getByTestId("project-form")).toBeInTheDocument();

    // Close modal
    fireEvent.click(button);
    expect(screen.queryByTestId("project-form")).not.toBeInTheDocument();
  });
});
