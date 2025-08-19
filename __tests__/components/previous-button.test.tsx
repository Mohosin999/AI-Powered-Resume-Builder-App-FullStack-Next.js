import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import PreviousButton from "@/components/ui/previous-button";

// Mock next/navigation
const mockBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe("PreviousButton", () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it("renders the PreviousButton", () => {
    render(<PreviousButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("calls router.back when clicked", () => {
    render(<PreviousButton />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
