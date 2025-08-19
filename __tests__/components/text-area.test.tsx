import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Textarea from "@/components/ui/text-area";

describe("Textarea component", () => {
  const defaultProps = {
    name: "description",
    id: "description",
    value: "Initial text",
  };

  it("renders the textarea with the correct default value", () => {
    render(<Textarea {...defaultProps} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue("Initial text");
  });

  it("calls onChange when text is changed", () => {
    const handleChange = jest.fn();
    render(<Textarea {...defaultProps} onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, { target: { value: "Updated text" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies the required attribute if passed", () => {
    render(<Textarea {...defaultProps} required />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeRequired();
  });

  it("applies custom className if provided", () => {
    render(<Textarea {...defaultProps} className="custom-class" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("custom-class");
  });
});
