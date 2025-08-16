// __tests__/app/root-layout.test.tsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

// Mock ClerkProvider
jest.mock("@clerk/nextjs", () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="clerk-provider">{children}</div>
  ),
}));

// Mock ThemeProvider
jest.mock("../../src/components/theme-provider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

// Mock ToastContainer
jest.mock("react-toastify", () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}));

// Mock Navbar
jest.mock("../../src/components/navbar", () => {
  const MockNavbar = () => <div data-testid="mock-navbar" />;
  MockNavbar.displayName = "Navbar";
  return MockNavbar;
});

// Mock Footer
jest.mock("../../src/components/footer", () => {
  const MockFooter = () => <div data-testid="mock-footer" />;
  MockFooter.displayName = "Footer";
  return MockFooter;
});

// 🚫 Silence <html>/<body> DOM nesting warnings only for this test file
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((msg, ...args) => {
    if (
      typeof msg === "string" &&
      (msg.includes("validateDOMNesting") || msg.includes("Warning:"))
    ) {
      return;
    }
    // keep other errors
    console.error(msg, ...args);
  });
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("Root Layout", () => {
  it("renders child inside root layout with navbar and footer", () => {
    render(
      <RootLayout>
        <div data-testid="child">Child</div>
      </RootLayout>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("clerk-provider")).toBeInTheDocument();
    expect(screen.getByTestId("theme-provider")).toBeInTheDocument();
    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
    expect(screen.getByTestId("toast-container")).toBeInTheDocument();
  });
});
