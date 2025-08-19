import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer";

describe("Footer", () => {
  it("renders footer with copyright text", () => {
    render(<Footer />);

    expect(
      screen.getByText("© 2025 AI Resume Builder. All rights reserved.")
    ).toBeInTheDocument();
  });

  it("has correct footer element and class", () => {
    render(<Footer />);

    const footer = screen
      .getByText("© 2025 AI Resume Builder. All rights reserved.")
      .closest("footer");

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass(
      "bg-white dark:bg-[#1C2434] text-white py-5 lg:py-8 shadow-sm"
    );
  });
});
