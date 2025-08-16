import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loading from "@/app/loading";

// Mock the Loader component
jest.mock("../../src/components/loader", () => {
  const MockLoader = () => <div data-testid="mock-loader" />;
  MockLoader.displayName = "Loader";
  return MockLoader;
});

describe("Loading Page", () => {
  it("renders Loader component", () => {
    render(<Loading />);

    expect(screen.getByTestId("mock-loader")).toBeInTheDocument();
  });
});
