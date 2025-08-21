import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dashboard from "@/app/dashboard/page";
import { getResumes } from "@/actions/resume-actions";

jest.mock("@/actions/resume-actions", () => ({
  getResumes: jest.fn(),
}));

jest.mock("@/components/display-all-resumes", () => ({
  __esModule: true,
  default: ({ allResumes }: { allResumes: [] }) => (
    <div data-testid="display-all-resumes">
      Mocked DisplayAllResumes ({allResumes.length} resumes)
    </div>
  ),
}));

describe("Dashboard Page", () => {
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
