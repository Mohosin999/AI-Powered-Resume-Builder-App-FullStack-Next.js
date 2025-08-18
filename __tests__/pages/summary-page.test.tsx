import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SummaryPage from "@/app/dashboard/[id]/summary/page";
import { getPersonalDetails, getSummary } from "@/actions/resume-actions";

jest.mock("@/actions/resume-actions", () => ({
  getSummary: jest.fn(),
  getPersonalDetails: jest.fn(),
}));

jest.mock("@/app/dashboard/[id]/summary/summary-form", () => ({
  __esModule: true,
  default: ({
    resumeId,
    summaryInfo,
    jobTitle,
  }: {
    resumeId: string;
    summaryInfo: { id: string; resumeId: string; content: string };
    jobTitle: string;
  }) => (
    <div data-testid="summary-form">
      Form for {resumeId} - {summaryInfo.content} - {jobTitle}
    </div>
  ),
}));

jest.mock("@/components/go-to-top", () => ({
  __esModule: true,
  default: () => <div data-testid="go-to-top" />,
}));

describe("SummaryPage", () => {
  const mockId = "123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SummaryForm with fetched data", async () => {
    (getSummary as jest.Mock).mockResolvedValue({
      id: "s1",
      content: "Experienced React Developer",
    });
    (getPersonalDetails as jest.Mock).mockResolvedValue({
      jobTitle: "Frontend Developer",
    });

    const ui = await SummaryPage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("summary-form")).toBeInTheDocument();
    expect(screen.getByTestId("summary-form")).toHaveTextContent(
      `Form for ${mockId} - Experienced React Developer - Frontend Developer`
    );
  });

  it("falls back to default values if no data returned", async () => {
    (getSummary as jest.Mock).mockResolvedValue(null);
    (getPersonalDetails as jest.Mock).mockResolvedValue(null);

    const ui = await SummaryPage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("summary-form")).toBeInTheDocument();
    expect(screen.getByTestId("summary-form")).toHaveTextContent(
      `Form for ${mockId} -`
    );
  });

  it("renders GoToTop button", async () => {
    const ui = await SummaryPage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
  });
});
