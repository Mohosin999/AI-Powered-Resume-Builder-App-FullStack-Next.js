import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ThemeProvider from "@/components/theme-provider";

// ✅ Correct mock
jest.mock("next-themes", () => ({
  __esModule: true,
  ThemeProvider: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="next-themes-provider" {...props}>
      {children}
    </div>
  ),
}));

// Prevent console errors
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("ThemeProvider", () => {
  it("renders children correctly", () => {
    render(
      <ThemeProvider>
        <p>Hello World</p>
      </ThemeProvider>
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("passes props to next-themes ThemeProvider", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <p>Theme Test</p>
      </ThemeProvider>
    );

    const provider = screen.getByTestId("next-themes-provider");
    expect(provider).toHaveAttribute("attribute", "class");
    expect(provider).toHaveAttribute("defaultTheme", "dark");
  });
});
