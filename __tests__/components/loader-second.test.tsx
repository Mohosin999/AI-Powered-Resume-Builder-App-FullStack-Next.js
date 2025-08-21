import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoaderSecond from "@/components/loader-second"; // adjust path

describe("LoaderSecond", () => {
  it("renders the loader icon", () => {
    render(<LoaderSecond />);
    const loaderIcon = screen.getByTestId("loader-icon");
    expect(loaderIcon).toBeInTheDocument();
    expect(loaderIcon).toHaveClass("animate-spin");
  });

  it("renders the text 'AI Resume Builder'", () => {
    render(<LoaderSecond />);
    expect(screen.getByText(/AI Resume Builder/i)).toBeInTheDocument();
  });
});
