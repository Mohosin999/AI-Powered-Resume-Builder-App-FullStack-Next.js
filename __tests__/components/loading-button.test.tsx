import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoadingButton from "@/components/ui/loading-button";

describe("LoadingButton", () => {
  it("renders the title when not loading", () => {
    render(
      <LoadingButton loading={false} loadingText="Loading..." title="Submit" />
    );

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("renders loader and loadingText when loading", () => {
    render(
      <LoadingButton loading={true} loadingText="Loading..." title="Submit" />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("applies correct props to the button", () => {
    render(
      <LoadingButton loading={false} loadingText="Loading..." title="Submit" />
    );

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("ghost-btn-3rd");
  });
});
