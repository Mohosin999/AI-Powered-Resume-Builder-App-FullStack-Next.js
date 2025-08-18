import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SkillPage from "@/app/dashboard/[id]/skills/page";
import { getSkills } from "@/actions/resume-actions";

// Mock getSkills
jest.mock("@/actions/resume-actions", () => ({
  getSkills: jest.fn(),
}));

// Mock SkillPageClient
jest.mock("@/app/dashboard/[id]/skills/skill-page-client", () => ({
  __esModule: true,
  default: ({
    resumeId,
    skills,
  }: {
    resumeId: string;
    skills: Array<{
      id: string;
      name: string;
      level?: string | null;
    }> | null;
  }) => (
    <div data-testid="skill-page-client">
      Client for {resumeId} - {skills?.[0]?.name || "No skills"}
    </div>
  ),
}));

// Mock GoToTop
jest.mock("@/components/go-to-top", () => ({
  __esModule: true,
  default: () => <div data-testid="go-to-top" />,
}));

describe("SkillPage", () => {
  const mockId = "resume-999";

  const mockSkills = [
    {
      id: "1",
      resumeId: mockId,
      name: "JavaScript",
      level: "Advanced",
    },
  ];

  it("renders SkillPageClient with skills", async () => {
    (getSkills as jest.Mock).mockResolvedValue(mockSkills);

    const ui = await SkillPage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("skill-page-client")).toHaveTextContent(
      `Client for ${mockId} - JavaScript`
    );
  });

  it("renders SkillPageClient with no skills message when skills is empty", async () => {
    (getSkills as jest.Mock).mockResolvedValue(null);

    const ui = await SkillPage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("skill-page-client")).toHaveTextContent(
      `Client for ${mockId} - No skills`
    );
  });

  it("renders GoToTop button", async () => {
    const ui = await SkillPage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
  });
});
