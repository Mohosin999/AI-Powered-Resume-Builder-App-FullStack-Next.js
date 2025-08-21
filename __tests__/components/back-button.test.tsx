import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "@/components/ui/back-button";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackButton", () => {
  it("renders button with given title", () => {
    (useRouter as jest.Mock).mockReturnValue({ back: jest.fn() });

    render(<BackButton title="Go Back" />);

    expect(screen.getByText(/go back/i)).toBeInTheDocument();
  });

  it("calls router.back() when clicked", () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    render(<BackButton title="Return" />);

    fireEvent.click(screen.getByText(/return/i));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
