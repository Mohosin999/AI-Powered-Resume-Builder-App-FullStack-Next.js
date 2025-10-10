import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/navbar";
import React from "react";

// Mock Clerk components
jest.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="signed-in">{children}</div>
  ),
  SignedOut: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="signed-out">{children}</div>
  ),
  SignInButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sign-in-button">{children}</div>
  ),
  SignUpButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sign-up-button">{children}</div>
  ),
  UserButton: () => <div data-testid="user-button">UserButton</div>,
}));

// Mock ModeToggle
jest.mock("@/components/mode-toggle", () => ({
  __esModule: true,
  default: () => <div data-testid="mode-toggle" />,
}));

// Mock Next/Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { src: string; alt: string }) => (
    <img {...props} alt={props.alt} />
  ),
}));

// Mock Next/Link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo and brand name", () => {
    render(<Navbar />);
    expect(screen.getByText("resumia")).toBeInTheDocument();
  });

  it("renders desktop menu with SignedIn and SignedOut sections", () => {
    render(<Navbar />);

    expect(screen.getByTestId("signed-in")).toBeInTheDocument();
    expect(screen.getByTestId("signed-out")).toBeInTheDocument();
    expect(screen.getAllByTestId("mode-toggle").length).toBeGreaterThanOrEqual(
      1
    );
    expect(screen.getByTestId("user-button")).toBeInTheDocument();
    expect(screen.getByTestId("sign-in-button")).toBeInTheDocument();
    expect(screen.getByTestId("sign-up-button")).toBeInTheDocument();
  });

  it("toggles mobile menu when menu button is clicked", () => {
    render(<Navbar />);

    // Menu button should be visible for mobile toggle
    const menuButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(menuButton!);
    expect(screen.getAllByTestId("mode-toggle").length).toBeGreaterThanOrEqual(
      2
    ); // Mobile + desktop

    // Close mobile menu
    fireEvent.click(menuButton!);
  });

  it("renders mobile menu SignedIn and SignedOut sections when opened", () => {
    render(<Navbar />);

    const menuButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(menuButton!);

    expect(screen.getAllByTestId("signed-in").length).toBeGreaterThanOrEqual(2); // Desktop + Mobile
    expect(screen.getAllByTestId("signed-out").length).toBeGreaterThanOrEqual(
      2
    ); // Desktop + Mobile
  });
});
