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
    expect(footer).toHaveClass("bg-white shadow-md dark:bg-[#1C2434] pt-8");
  });
});
