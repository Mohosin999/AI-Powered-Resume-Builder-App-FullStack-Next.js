import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "@/components/ui/text-input";

describe("TextInput component", () => {
  const defaultProps = {
    name: "username",
    id: "username",
    value: "Initial value",
  };

  it("renders the input with correct default value and type", () => {
    render(<TextInput {...defaultProps} />);
    const input = screen.getByDisplayValue("Initial value");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders with custom type if provided", () => {
    render(<TextInput {...defaultProps} type="email" />);
    const input = screen.getByDisplayValue("Initial value");
    expect(input).toHaveAttribute("type", "email");
  });

  it("calls onChange when value changes", () => {
    const handleChange = jest.fn();
    render(<TextInput {...defaultProps} onChange={handleChange} />);
    const input = screen.getByDisplayValue("Initial value");

    fireEvent.change(input, { target: { value: "Updated value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies placeholder if provided", () => {
    render(<TextInput {...defaultProps} placeholder="Enter username" />);
    const input = screen.getByPlaceholderText("Enter username");
    expect(input).toBeInTheDocument();
  });

  it("applies required attribute if true", () => {
    render(<TextInput {...defaultProps} required />);
    const input = screen.getByDisplayValue("Initial value");
    expect(input).toBeRequired();
  });

  it("applies custom className if provided", () => {
    render(<TextInput {...defaultProps} className="custom-class" />);
    const input = screen.getByDisplayValue("Initial value");
    expect(input).toHaveClass("custom-class");
  });
});
