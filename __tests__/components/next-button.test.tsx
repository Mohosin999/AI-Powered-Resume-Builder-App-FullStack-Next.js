import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import NextButton from "@/components/ui/next-button";

describe("NextButton", () => {
  const id = "123";
  const pageName = "profile";

  it("renders the NextButton", () => {
    render(<NextButton id={id} pageName={pageName} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/dashboard/${id}/${pageName}`);
  });

  it("renders disabled state correctly", () => {
    render(<NextButton id={id} pageName={pageName} disabled />);
    const link = screen.getByRole("link");
    const button = screen.getByRole("button");

    expect(link).toHaveAttribute("href", "#");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled-btn");
  });

  it("allows navigation when enabled", () => {
    render(<NextButton id={id} pageName={pageName} />);
    const link = screen.getByRole("link");

    const clickEvent = { preventDefault: jest.fn() };
    fireEvent.click(link, clickEvent);

    expect(clickEvent.preventDefault).not.toHaveBeenCalled();
  });
});
