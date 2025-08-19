import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ExternalLink from "@/components/ui/external-link";

describe("ExternalLink", () => {
  it("renders link with given url and label", () => {
    render(<ExternalLink url="https://example.com" label="Example" />);

    const link = screen.getByText("Example");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies custom className if provided", () => {
    render(
      <ExternalLink
        url="https://example.com"
        label="Custom Class"
        className="custom-class"
      />
    );

    const link = screen.getByText("Custom Class");
    expect(link).toHaveClass("custom-class");
  });

  it("applies default className if none is provided", () => {
    render(<ExternalLink url="https://example.com" label="Default Class" />);

    const link = screen.getByText("Default Class");
    expect(link).toHaveClass("text-xs text-blue-500 ml-2 underline");
  });

  it("returns null if url is falsy", () => {
    const { container } = render(<ExternalLink url={""} label="No Link" />);
    expect(container).toBeEmptyDOMElement();
  });
});
