import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProjectPage from "@/app/dashboard/[id]/projects/page";
import { getProjects } from "@/actions/resume-actions";

// Mock getProjects
jest.mock("@/actions/resume-actions", () => ({
  getProjects: jest.fn(),
}));

// Mock ProjectPageClient
jest.mock("@/app/dashboard/[id]/projects/project-page-client", () => ({
  __esModule: true,
  default: ({
    resumeId,
    projects,
  }: {
    resumeId: string;
    projects: Array<{
      id: string;
      name: string;
      description: string;
      technologies?: string[] | null;
      githubUrl?: string | null;
      demoUrl?: string | null;
    }> | null;
  }) => (
    <div data-testid="project-page-client">
      Client for {resumeId} - {projects?.[0]?.name || "No projects"}
    </div>
  ),
}));

// Mock GoToTop
jest.mock("@/components/go-to-top", () => ({
  __esModule: true,
  default: () => <div data-testid="go-to-top" />,
}));

describe("ProjectPage", () => {
  const mockId = "resume-789";

  const mockProjects = [
    {
      id: "1",
      resumeId: mockId,
      name: "AI Resume Builder",
      description: "A tool to generate resumes using AI",
      technologies: ["React", "Next.js", "TypeScript"],
      githubUrl: "https://github.com/example",
      demoUrl: "https://example.com",
    },
  ];

  it("renders ProjectPageClient with projects", async () => {
    (getProjects as jest.Mock).mockResolvedValue(mockProjects);

    const ui = await ProjectPage({ params: { id: mockId } });
    render(ui);

    expect(screen.getByTestId("project-page-client")).toHaveTextContent(
      `Client for ${mockId} - AI Resume Builder`
    );
  });

  it("renders ProjectPageClient with no projects message when projects is empty", async () => {
    (getProjects as jest.Mock).mockResolvedValue(null);

    const ui = await ProjectPage({ params: { id: mockId } });
    render(ui);

    expect(screen.getByTestId("project-page-client")).toHaveTextContent(
      `Client for ${mockId} - No projects`
    );
  });

  it("renders GoToTop button", async () => {
    const ui = await ProjectPage({ params: { id: mockId } });
    render(ui);

    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
  });
});
