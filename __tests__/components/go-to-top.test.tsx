import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import GoToTop from "@/components/go-to-top";

// Mock window.scrollTo
beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe("GoToTop", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render button when scrollY <= 300", () => {
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    render(<GoToTop />);
    expect(
      screen.queryByRole("button", { name: /Go to top/i })
    ).not.toBeInTheDocument();
  });

  it("renders button when scrollY > 300", () => {
    Object.defineProperty(window, "scrollY", { value: 400, writable: true });
    render(<GoToTop />);

    // Trigger scroll event manually
    fireEvent.scroll(window);

    const button = screen.getByRole("button", { name: /Go to top/i });
    expect(button).toBeInTheDocument();
  });

  it("calls window.scrollTo when button is clicked", () => {
    Object.defineProperty(window, "scrollY", { value: 400, writable: true });
    render(<GoToTop />);

    fireEvent.scroll(window);
    const button = screen.getByRole("button", { name: /Go to top/i });

    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
