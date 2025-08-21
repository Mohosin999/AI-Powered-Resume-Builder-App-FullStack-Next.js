import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ModeToggle from "@/components/mode-toggle";

// Mock next-themes
const mockSetTheme = jest.fn();

jest.mock("next-themes", () => ({
  useTheme: jest.fn(() => ({
    theme: "light",
    setTheme: mockSetTheme,
  })),
}));

describe("ModeToggle component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the toggle button with Sun and Moon icons", () => {
    render(<ModeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("calls setTheme with 'dark' when clicked while in light mode", () => {
    render(<ModeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme with 'light' when clicked while in dark mode", () => {
    // Override useTheme for this test
    const { useTheme } = require("next-themes");
    (useTheme as jest.Mock).mockImplementationOnce(() => ({
      theme: "dark",
      setTheme: mockSetTheme,
    }));

    render(<ModeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
