import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ExperiencePage from "@/app/dashboard/[id]/experiences/page";
import { getExperiences } from "@/actions/resume-actions";

// Mock getExperiences
jest.mock("../../src/actions/resume-actions", () => ({
  getExperiences: jest.fn(),
}));

// Mock ExperiencePageClient
jest.mock(
  "../../src/app/dashboard/[id]/experiences/experience-page-client",
  () => {
    interface MockExperiencePageClientProps {
      resumeId: string;
      experiences: Array<{
        id: string;
        jobTitle: string;
        company: string;
      }> | null;
    }

    return {
      __esModule: true,
      default: ({ resumeId, experiences }: MockExperiencePageClientProps) => (
        <div data-testid="mock-experience-page-client">
          Client for {resumeId} -{" "}
          {experiences?.[0]?.jobTitle || "No experiences"}
        </div>
      ),
    };
  }
);

// Mock the GoToTop Component
jest.mock("../../src/components/go-to-top", () => {
  const MockGoToTop = () => <div data-testid="mock-go-to-top" />;
  MockGoToTop.displayName = "GoToTop";
  return MockGoToTop;
});

describe("ExperiencePage", () => {
  it("renders client with experiences and GoToTop button", async () => {
    const fakeId = "resume-456";
    const mockExperiences = [
      {
        id: "exp-123",
        jobTitle: "Software Engineer",
        company: "Tech Corp",
      },
    ];
    (getExperiences as jest.Mock).mockResolvedValue(mockExperiences);

    const ui = await ExperiencePage({ params: { id: fakeId } });
    render(ui);

    expect(screen.getByTestId("mock-experience-page-client")).toHaveTextContent(
      `Client for ${fakeId} - Software Engineer`
    );
    expect(screen.getByTestId("mock-go-to-top")).toBeInTheDocument();
  });

  it("renders client with no experiences message when experiences is null", async () => {
    const fakeId = "resume-456";
    (getExperiences as jest.Mock).mockResolvedValue(null);

    const ui = await ExperiencePage({ params: { id: fakeId } });
    render(ui);

    expect(screen.getByTestId("mock-experience-page-client")).toHaveTextContent(
      `Client for ${fakeId} - No experiences`
    );
    expect(screen.getByTestId("mock-go-to-top")).toBeInTheDocument();
  });

  it("renders client with no experiences message when experiences is empty array", async () => {
    const fakeId = "resume-456";
    (getExperiences as jest.Mock).mockResolvedValue([]);

    const ui = await ExperiencePage({ params: { id: fakeId } });
    render(ui);

    expect(screen.getByTestId("mock-experience-page-client")).toHaveTextContent(
      `Client for ${fakeId} - No experiences`
    );
    expect(screen.getByTestId("mock-go-to-top")).toBeInTheDocument();
  });
});
