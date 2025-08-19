import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SkipButton from "@/components/ui/skip-button";

describe("SkipButton", () => {
  const id = "resume-123";
  const pageName = "summary";

  it("renders the Skip button with correct text", () => {
    render(<SkipButton id={id} pageName={pageName} />);
    const button = screen.getByText("Skip");
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });

  it("renders the correct link URL", () => {
    render(<SkipButton id={id} pageName={pageName} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/dashboard/${id}/${pageName}`);
  });

  it("applies correct classes to the button", () => {
    render(<SkipButton id={id} pageName={pageName} />);
    const button = screen.getByText("Skip");
    expect(button).toHaveClass("ghost-btn-2nd");
  });
});
