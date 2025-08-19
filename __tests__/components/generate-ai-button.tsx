import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import GenerateFromAIButton from "@/components/ui/generate-ai-button";

describe("GenerateFromAIButton", () => {
  it("renders with brain icon and 'Generate from AI' when not loading", () => {
    const mockClick = jest.fn();
    render(<GenerateFromAIButton onclick={mockClick} loading={false} />);

    expect(screen.getByText("Generate from AI")).toBeInTheDocument();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("renders with loader icon and 'Generating' when loading", () => {
    const mockClick = jest.fn();
    render(<GenerateFromAIButton onclick={mockClick} loading={true} />);

    expect(screen.getByText("Generating")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onclick when clicked and not loading", () => {
    const mockClick = jest.fn();
    render(<GenerateFromAIButton onclick={mockClick} loading={false} />);

    fireEvent.click(screen.getByRole("button"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onclick when loading", () => {
    const mockClick = jest.fn();
    render(<GenerateFromAIButton onclick={mockClick} loading={true} />);

    fireEvent.click(screen.getByRole("button"));
    expect(mockClick).not.toHaveBeenCalled();
  });
});
