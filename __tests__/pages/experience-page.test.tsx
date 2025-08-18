import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ExperiencePage from "@/app/dashboard/[id]/experiences/page";
import { getExperiences } from "@/actions/resume-actions";

jest.mock("@/actions/resume-actions", () => ({
  getExperiences: jest.fn(),
}));

jest.mock("@/app/dashboard/[id]/experiences/experience-page-client", () => ({
  __esModule: true,
  default: ({
    resumeId,
    experiences,
  }: {
    resumeId: string;
    experiences: Array<{
      id: string;
      jobTitle: string;
      company: string;
      location?: string | null;
      startDate: string;
      endDate?: string | null;
      current: boolean;
      description: string;
    }> | null;
  }) => (
    <div data-testid="experience-page-client">
      Client for {resumeId} - {experiences?.[0]?.jobTitle || "No experiences"}
    </div>
  ),
}));

jest.mock("@/components/go-to-top", () => ({
  __esModule: true,
  default: () => <div data-testid="go-to-top" />,
}));

describe("ExperiencePage", () => {
  const mockId = "resume-456";

  it("renders ExperiencePageClient with experiences", async () => {
    const mockExperiences = [
      {
        id: "1",
        resumeId: mockId,
        jobTitle: "Software Engineer",
        company: "Google",
        location: "Remote",
        startDate: "2021",
        endDate: "2022",
        current: false,
        description: "Worked on frontend with React",
      },
    ];

    (getExperiences as jest.Mock).mockResolvedValue(mockExperiences);
    const ui = await ExperiencePage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("experience-page-client")).toHaveTextContent(
      `Client for ${mockId} - Software Engineer`
    );
  });

  it("renders ExperiencePageClient with no experiences message when experiences is empty", async () => {
    (getExperiences as jest.Mock).mockResolvedValue(null);

    const ui = await ExperiencePage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("experience-page-client")).toHaveTextContent(
      `Client for ${mockId} - No experiences`
    );
  });

  it("renders GoToTop button", async () => {
    const ui = await ExperiencePage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
  });
});
