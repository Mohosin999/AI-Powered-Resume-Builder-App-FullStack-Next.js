import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AnimatedHeading from "@/components/animated-heading";

describe("AnimatedHeading", () => {
  it("renders the heading text with correct classes", () => {
    render(<AnimatedHeading text="Hello World" className="extra-class" />);
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass(
      "text-orange-500",
      "text-3xl",
      "md:text-5xl",
      "font-bold",
      "extra-class"
    );
  });

  it("renders each letter inside motion span", () => {
    render(<AnimatedHeading text="Hi" />);
    // There should be 2 letters: H, i
    expect(screen.getByText("H")).toBeInTheDocument();
    expect(screen.getByText("i")).toBeInTheDocument();
  });
});
