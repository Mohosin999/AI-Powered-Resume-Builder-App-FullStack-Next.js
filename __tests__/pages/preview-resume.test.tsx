import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PreviewResume from "@/app/dashboard/[id]/preview-resume/page";

// Mock actions
jest.mock("@/actions/resume-actions", () => ({
  getPersonalDetails: jest.fn(),
  getSummary: jest.fn(),
  getExperiences: jest.fn(),
  getProjects: jest.fn(),
  getEducations: jest.fn(),
  getSkills: jest.fn(),
}));

// Mock components
jest.mock("@/components/ui/download-button", () => ({
  __esModule: true,
  default: () => <div data-testid="download-button" />,
}));

jest.mock("@/components/ui/resume-heading", () => ({
  __esModule: true,
  default: ({ title, highlight }: { title: string; highlight: string }) => (
    <div data-testid="resume-heading">
      {title} - {highlight}
    </div>
  ),
}));

jest.mock("@/components/ui/external-link", () => ({
  __esModule: true,
  default: ({ url, label }: { url: string; label: string }) => (
    <a data-testid="external-link" href={url}>
      {label}
    </a>
  ),
}));

jest.mock("@/components/ui/back-button", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <span data-testid="back-button">{title}</span>
  ),
}));

jest.mock("@/components/go-to-top", () => ({
  __esModule: true,
  default: () => <div data-testid="go-to-top" />,
}));

const {
  getPersonalDetails,
  getSummary,
  getExperiences,
  getProjects,
  getEducations,
  getSkills,
} = jest.requireMock("@/actions/resume-actions");

describe("PreviewResume", () => {
  const mockParams = { id: "resume-1" };

  beforeEach(() => {
    jest.clearAllMocks();

    (getPersonalDetails as jest.Mock).mockResolvedValue({
      firstName: "John",
      lastName: "Doe",
      jobTitle: "Frontend Developer",
      email: "john@example.com",
      socialLink: "https://linkedin.com/in/johndoe",
    });

    (getSummary as jest.Mock).mockResolvedValue({
      content: "Passionate developer with experience in React and Next.js.",
    });

    (getExperiences as jest.Mock).mockResolvedValue([
      {
        id: "exp-1",
        company: "Tech Corp",
        location: "Remote",
        jobTitle: "Frontend Engineer",
        startDate: "2020",
        endDate: "2022",
        description: "• Built UI components\n• Improved performance",
      },
    ]);

    (getProjects as jest.Mock).mockResolvedValue([
      {
        id: "proj-1",
        name: "Portfolio Website",
        url: "https://portfolio.com",
        repoUrl: "https://github.com/johndoe/portfolio",
        caseStudyUrl: "",
        description: "• Designed responsive layout\n• Deployed with Vercel",
      },
    ]);

    (getEducations as jest.Mock).mockResolvedValue([
      {
        id: "edu-1",
        institution: "University of Tech",
        degree: "BSc",
        field: "Computer Science",
        startDate: "2016",
        endDate: "2020",
      },
    ]);

    (getSkills as jest.Mock).mockResolvedValue([
      { id: "skill-1", name: "JavaScript" },
      { id: "skill-2", name: "React" },
    ]);
  });

  it("renders download button and heading", async () => {
    render(await PreviewResume({ params: mockParams }));

    expect(
      screen.getByText(/Congrats! Your Professional Resume is Ready/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("download-button")).toBeInTheDocument();
  });

  it("renders personal details", async () => {
    render(await PreviewResume({ params: mockParams }));

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(
      screen.getByText("https://linkedin.com/in/johndoe")
    ).toBeInTheDocument();
  });

  it("renders summary", async () => {
    render(await PreviewResume({ params: mockParams }));

    expect(
      screen.getByText(
        /Passionate developer with experience in React and Next.js/i
      )
    ).toBeInTheDocument();
  });

  it("renders experiences with bullet points", async () => {
    render(await PreviewResume({ params: mockParams }));

    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Built UI components")).toBeInTheDocument();
    expect(screen.getByText("Improved performance")).toBeInTheDocument();
  });

  it("renders projects with external links", async () => {
    render(await PreviewResume({ params: mockParams }));

    expect(screen.getByText("Portfolio Website")).toBeInTheDocument();
    expect(screen.getAllByTestId("external-link")[0]).toHaveAttribute(
      "href",
      "https://portfolio.com"
    );
    expect(screen.getAllByTestId("external-link")[1]).toHaveAttribute(
      "href",
      "https://github.com/johndoe/portfolio"
    );
  });

  it("renders education details", async () => {
    render(await PreviewResume({ params: mockParams }));

    expect(screen.getByText("University of Tech")).toBeInTheDocument();
    expect(screen.getByText(/BSc, Computer Science/i)).toBeInTheDocument();
    expect(screen.getByText("2016 - 2020")).toBeInTheDocument();
  });

  it("renders skills list", async () => {
    render(await PreviewResume({ params: mockParams }));

    expect(screen.getByText("JavaScript • React")).toBeInTheDocument();
  });

  it("renders GoToTop button", async () => {
    render(await PreviewResume({ params: mockParams }));

    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
  });
});
