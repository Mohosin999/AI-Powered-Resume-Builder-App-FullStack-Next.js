import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ResumeHeading from "@/components/ui/resume-heading";

describe("ResumeHeading", () => {
  it("renders the title correctly", () => {
    render(<ResumeHeading title="Experience" />);
    const heading = screen.getByText("Experience");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it("renders the highlight if provided", () => {
    render(<ResumeHeading title="Experience" highlight="(2023)" />);
    const highlight = screen.getByText("(2023)");
    expect(highlight).toBeInTheDocument();
    expect(highlight).toHaveClass("text-sm");
  });

  it("does not render highlight if not provided", () => {
    render(<ResumeHeading title="Experience" />);
    const highlight = screen.queryByText(/\(.+\)/); // any parentheses
    expect(highlight).not.toBeInTheDocument();
  });

  it("applies correct classes to the heading", () => {
    render(<ResumeHeading title="Experience" />);
    const heading = screen.getByText("Experience");
    expect(heading).toHaveClass(
      "text-900-100",
      "text-lg",
      "mt-6",
      "border-b",
      "border-gray-600",
      "uppercase"
    );
  });
});
