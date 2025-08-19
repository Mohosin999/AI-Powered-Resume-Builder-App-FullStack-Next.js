import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "@/components/home-page";

// Mock GetStartedButton
jest.mock("@/components/ui/get-started-button", () => ({
  __esModule: true,
  default: () => <button data-testid="get-started-button">Get Started</button>,
}));

// Mock GoToTop
jest.mock("@/components/go-to-top", () => ({
  __esModule: true,
  default: () => <div data-testid="go-to-top" />,
}));

jest.mock("lucide-react", () => ({
  GithubIcon: () => <svg data-testid="github-icon" />,
  LinkedinIcon: () => <svg data-testid="linkedin-icon" />,
}));

jest.mock("react-icons/fa6", () => ({
  FaXTwitter: () => <svg data-testid="twitter-icon" />,
}));

describe("HomePage", () => {
  it("renders hero section with heading and description", () => {
    render(<HomePage />);

    expect(
      screen.getByText(/You don’t need to worry about resume formatting here/i)
    ).toBeInTheDocument();
  });

  it("renders Get Started and GitHub buttons", () => {
    render(<HomePage />);
    expect(screen.getByTestId("get-started-button")).toBeInTheDocument();
    expect(screen.getByText(/View GitHub Repository/i)).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<HomePage />);

    expect(screen.getByTestId("linkedin-icon")).toBeInTheDocument();
    expect(screen.getByTestId("twitter-icon")).toBeInTheDocument();
    expect(screen.getAllByTestId("github-icon").length).toBeGreaterThan(1);
  });

  it("renders key features section", () => {
    render(<HomePage />);
    expect(screen.getByText("Why Our Resume Builder?")).toBeInTheDocument();
  });

  it("renders AI features section", () => {
    render(<HomePage />);

    expect(screen.getByText("How AI Enhances Your Resume")).toBeInTheDocument();
    // Check that at least one AI feature title is rendered
    expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
  });

  it("renders testimonials section", () => {
    render(<HomePage />);

    expect(screen.getByText("What Our Users Are Saying")).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
  });

  it("renders GoToTop button", () => {
    render(<HomePage />);
    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
  });
});
