import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EducationPage from "@/app/dashboard/[id]/education/page";
import { getEducations } from "@/actions/resume-actions";

// Mock getEducations
jest.mock("@/actions/resume-actions", () => ({
  getEducations: jest.fn(),
}));

// Mock EducationPageClient
jest.mock("@/app/dashboard/[id]/education/education-page-client", () => ({
  __esModule: true,
  default: ({
    resumeId,
    educations,
  }: {
    resumeId: string;
    educations: Array<{
      id: string;
      school: string;
      degree: string;
      fieldOfStudy?: string | null;
      startDate: string;
      endDate?: string | null;
      grade?: string | null;
      description?: string | null;
    }> | null;
  }) => (
    <div data-testid="education-page-client">
      Client for {resumeId} - {educations?.[0]?.school || "No educations"}
    </div>
  ),
}));

// Mock GoToTop
jest.mock("@/components/go-to-top", () => ({
  __esModule: true,
  default: () => <div data-testid="go-to-top" />,
}));

describe("EducationPage", () => {
  const mockId = "resume-123";

  const mockEducations = [
    {
      id: "1",
      resumeId: mockId,
      school: "MIT",
      degree: "BSc Computer Science",
      fieldOfStudy: "Software Engineering",
      startDate: "2018",
      endDate: "2022",
      grade: "A",
      description: "Studied CS fundamentals",
    },
  ];

  it("renders EducationPageClient with educations", async () => {
    (getEducations as jest.Mock).mockResolvedValue(mockEducations);

    const ui = await EducationPage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("education-page-client")).toHaveTextContent(
      `Client for ${mockId} - MIT`
    );
  });

  it("renders EducationPageClient with no educations message when educations is empty", async () => {
    (getEducations as jest.Mock).mockResolvedValue(null);

    const ui = await EducationPage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("education-page-client")).toHaveTextContent(
      `Client for ${mockId} - No educations`
    );
  });

  it("renders GoToTop button", async () => {
    const ui = await EducationPage({ params: { id: mockId } });
    render(ui);

    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
  });
});
