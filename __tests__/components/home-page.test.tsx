import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "@/components/home-page";

// Mock syncUser (avoid hitting server)
jest.mock("@/actions/user-actions", () => ({
  syncUser: jest.fn(),
}));

// Mock AnimatedHeading
jest.mock("@/components/animated-heading", () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => (
    <h1 data-testid="animated-heading">{text}</h1>
  ),
}));

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

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentProps<"img">) => <img {...props} />,
}));

jest.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-carousel">{children}</div>
  ),
  CarouselContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-carousel-item">{children}</div>
  ),
  CarouselNext: () => <button data-testid="mock-carousel-next">Next</button>,
  CarouselPrevious: () => (
    <button data-testid="mock-carousel-prev">Prev</button>
  ),
}));

// Mock icons
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
    expect(screen.getByTestId("animated-heading")).toBeInTheDocument();
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
    expect(screen.getByTestId("mock-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("mock-carousel-content")).toBeInTheDocument();
  });

  it("renders GoToTop button", () => {
    render(<HomePage />);
    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
  });
});
