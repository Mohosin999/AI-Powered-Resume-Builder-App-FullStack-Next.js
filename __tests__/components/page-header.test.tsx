import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PageHeader from "@/components/PageHeader";

// Mock buttons
jest.mock("@/components/ui/next-button", () => ({
  __esModule: true,
  default: ({
    id,
    pageName,
    disabled,
  }: {
    id: string;
    pageName: string;
    disabled?: boolean;
  }) => (
    <button data-testid="next-button" disabled={disabled}>
      Next {pageName} for {id}
    </button>
  ),
}));

jest.mock("@/components/ui/skip-button", () => ({
  __esModule: true,
  default: ({ id, pageName }: { id: string; pageName: string }) => (
    <button data-testid="skip-button">
      Skip {pageName} for {id}
    </button>
  ),
}));

jest.mock("@/components/ui/previous-button", () => ({
  __esModule: true,
  default: () => <button data-testid="previous-button">Previous</button>,
}));

describe("PageHeader", () => {
  const props = {
    title: "Test Page",
    resumeId: "resume-1",
    nextPage: "next-page",
  };

  it("renders title", () => {
    render(<PageHeader {...props} />);
    expect(screen.getByText("Test Page")).toBeInTheDocument();
  });

  it("renders NextButton and passes props correctly", () => {
    render(<PageHeader {...props} />);
    const nextBtn = screen.getByTestId("next-button");
    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn).not.toBeDisabled();
    expect(nextBtn).toHaveTextContent(
      `Next ${props.nextPage} for ${props.resumeId}`
    );
  });

  it("renders SkipButton when showSkip is true", () => {
    render(<PageHeader {...props} showSkip />);
    const skipBtn = screen.getByTestId("skip-button");
    expect(skipBtn).toBeInTheDocument();
    expect(skipBtn).toHaveTextContent(
      `Skip ${props.nextPage} for ${props.resumeId}`
    );
  });

  it("does not render SkipButton when showSkip is false", () => {
    render(<PageHeader {...props} />);
    expect(screen.queryByTestId("skip-button")).not.toBeInTheDocument();
  });

  it("renders PreviousButton when showPrevious is true", () => {
    render(<PageHeader {...props} showPrevious />);
    const prevBtn = screen.getByTestId("previous-button");
    expect(prevBtn).toBeInTheDocument();
    expect(prevBtn).toHaveTextContent("Previous");
  });

  it("disables NextButton when isEditing is true", () => {
    render(<PageHeader {...props} isEditing />);
    const nextBtn = screen.getByTestId("next-button");
    expect(nextBtn).toBeDisabled();
  });
});
