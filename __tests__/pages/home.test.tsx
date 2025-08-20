import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/components/home-page", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-homepage" />,
}));

describe("Home Page", () => {
  it("renders renders HomePage component", async () => {
    const ui = await Home();
    render(ui);

    expect(screen.getByTestId("mock-homepage")).toBeInTheDocument();
  });
});
