import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dashboard from "@/app/dashboard/page";
import { getResumes } from "@/actions/resume-actions";

// Mock getResumes
jest.mock("../../src/actions/resume-actions", () => ({
  getResumes: jest.fn(),
}));

// Mock DisplayAllResumes
jest.mock("../../src/components/display-all-resumes", () => ({
  __esModule: true,
  default: ({ allResumes }: { allResumes: [] }) => (
    <div data-testid="display-all-resumes">
      Mocked DisplayAllResumes ({allResumes.length} resumes)
    </div>
  ),
}));

describe("Dashboard Page", () => {
  it("renders DisplayAllResumes when resumes exist", async () => {
    (getResumes as jest.Mock).mockResolvedValue([
      { id: 1, title: "Frontend Resume" },
    ]);

    const ui = await Dashboard();
    render(ui);

    expect(screen.getByTestId("display-all-resumes")).toBeInTheDocument();
    expect(screen.getByText(/1 resumes/i)).toBeInTheDocument();
  });

  it("renders empty state when no resumes exist", async () => {
    (getResumes as jest.Mock).mockResolvedValue([]);

    const ui = await Dashboard();
    render(ui);

    expect(
      screen.getByText(/oops! no resume found. please create one./i)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/empty dashboard with no resume/i)
    ).toBeInTheDocument();
  });
});
