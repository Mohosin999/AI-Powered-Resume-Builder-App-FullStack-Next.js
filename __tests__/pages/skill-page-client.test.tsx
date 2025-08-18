import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SkillPageClient from "@/app/dashboard/[id]/skills/skill-page-client";

// Mock dependencies
jest.mock("@/actions/resume-actions", () => ({
  deleteSkill: jest.fn(),
}));

jest.mock("@/components/PageHeader", () => ({
  __esModule: true,
  default: ({
    title,
    resumeId,
    nextPage,
    showSkip,
    showPrevious,
    isEditing,
  }: {
    title: string;
    resumeId: string;
    nextPage: string;
    showSkip?: boolean;
    showPrevious?: boolean;
    isEditing?: boolean;
  }) => (
    <div data-testid="page-header">
      <h2>{title}</h2>
      <p>resumeId: {resumeId}</p>
      <p>nextPage: {nextPage}</p>
      <p>showSkip: {showSkip ? "true" : "false"}</p>
      <p>showPrevious: {showPrevious ? "true" : "false"}</p>
      <p>isEditing: {isEditing ? "true" : "false"}</p>
    </div>
  ),
}));

jest.mock("@/components/skill-form", () => ({
  __esModule: true,
  default: ({ resumeId }: { resumeId: string }) => (
    <div data-testid="skill-form">SkillForm for {resumeId}</div>
  ),
}));

jest.mock("@/components/delete-confirm-dialog", () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) => (
    <div data-testid="delete-confirm-dialog">
      {open ? "Dialog Open" : "Dialog Closed"}
    </div>
  ),
}));

describe("SkillPageClient", () => {
  const mockResumeId = "resume-1";
  const mockSkills = [
    { id: "skill-1", name: "JavaScript" },
    { id: "skill-2", name: "React" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders PageHeader and SkillForm", () => {
    render(<SkillPageClient skills={mockSkills} resumeId={mockResumeId} />);

    expect(screen.getByTestId("page-header")).toBeInTheDocument();
    expect(screen.getByTestId("skill-form")).toHaveTextContent(
      `SkillForm for ${mockResumeId}`
    );
  });

  it("renders the list of skills", () => {
    render(<SkillPageClient skills={mockSkills} resumeId={mockResumeId} />);

    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders no skills list if empty", () => {
    render(<SkillPageClient skills={[]} resumeId={mockResumeId} />);

    expect(screen.queryByText("JavaScript")).not.toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });
});
