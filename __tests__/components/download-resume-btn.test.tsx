import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DownloadResumeBtn from "@/components/ui/download-button";

// Mock window.print
beforeAll(() => {
  global.print = jest.fn();
});

describe("DownloadResumeBtn", () => {
  it("renders the Download Resume button", () => {
    render(<DownloadResumeBtn />);
    expect(screen.getByText("Download Resume")).toBeInTheDocument();
  });

  it("calls window.print when clicked", () => {
    render(<DownloadResumeBtn />);
    const button = screen.getByText("Download Resume");
    fireEvent.click(button);

    expect(global.print).toHaveBeenCalledTimes(1);
  });
});
