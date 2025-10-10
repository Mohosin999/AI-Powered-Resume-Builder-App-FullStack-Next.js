import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loader from "@/components/loader";

jest.mock("lucide-react", () => ({
  Loader: () => <div data-testid="loader-icon" />,
}));

describe("Loader component", () => {
  it("renders the loader with spinner and text", () => {
    render(<Loader />);

    // Check for the text
    expect(screen.getByText("resumia")).toBeInTheDocument();

    // Check for the spinner (svg element)
    const spinner = screen.getByTestId("loader-icon");
    expect(spinner).toBeInTheDocument();

    // Check that the container has the backdrop classes
    const container = screen.getByText("resumia").parentElement?.parentElement;
    expect(container).toHaveClass(
      "fixed",
      "inset-0",
      "flex",
      "justify-center",
      "items-center",
      "z-50"
    );
  });
});
