import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// Mock the HomePage component
jest.mock("../../src/components/home-page", () => {
  const MockHomePage = () => <div data-testid="mock-homepage" />;
  MockHomePage.displayName = "HomePage";
  return MockHomePage;
});

describe("Home Page", () => {
  it("renders renders HomePage component", () => {
    render(<Home />);

    expect(screen.getByTestId("mock-homepage")).toBeInTheDocument();
  });
});
