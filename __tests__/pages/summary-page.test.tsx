import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SummaryPage from "@/app/dashboard/[id]/summary/page";
import { getPersonalDetails, getSummary } from "@/actions/resume-actions";

// Mock the dependencies
jest.mock("../../src/actions/resume-actions", () => ({
  getSummary: jest.fn(),
  getPersonalDetails: jest.fn(),
}));

// Mock the GoToTop Component
jest.mock("../../src/components/go-to-top", () => {
  const MockGoToTop = () => <div data-testid="go-to-top" />;
  MockGoToTop.displayName = "GoToTop";
  return MockGoToTop;
});

// Mock SummaryForm
jest.mock("../../src/app/dashboard/[id]/summary/summary-form", () => {
  interface MockSummaryFormProps {
    resumeId: string;
    summaryInfo: {
      id: string;
      resumeId: string;
      content: string;
    };
    jobTitle: string;
  }

  return {
    __esModule: true,
    default: ({ resumeId, summaryInfo, jobTitle }: MockSummaryFormProps) => (
      <div data-testid="summary-form">
        Form for {resumeId} - {summaryInfo.content} - {jobTitle}
      </div>
    ),
  };
});

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
    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
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
});
