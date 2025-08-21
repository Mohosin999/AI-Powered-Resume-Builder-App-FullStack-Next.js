import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DashboardClientLayout from "@/components/dashboard-client-layout";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/actions/resume-actions", () => ({
  createResume: jest.fn(),
}));

jest.mock("@/components/create-resume-dialog", () => ({
  __esModule: true,
  default: () => <div data-testid="create-resume-dialog">Dialog</div>,
}));

// Prevent console errors
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("DashboardClientLayout", () => {
  const mockChildren = <div data-testid="children">Main Content</div>;
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    image: "/profile.jpg",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders children directly when pathname is preview-resume", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/preview-resume");

    render(
      <DashboardClientLayout user={mockUser}>
        {mockChildren}
      </DashboardClientLayout>
    );

    expect(screen.getByTestId("children")).toBeInTheDocument();
    expect(
      screen.queryByTestId("create-resume-dialog")
    ).not.toBeInTheDocument();
  });

  it("renders sidebar with user details and navigation when pathname is not preview-resume", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(
      <DashboardClientLayout user={mockUser}>
        {mockChildren}
      </DashboardClientLayout>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("children")).toBeInTheDocument();
  });

  it("renders placeholder text when user image is missing", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(
      <DashboardClientLayout user={{ name: "Jane", email: "jane@example.com" }}>
        {mockChildren}
      </DashboardClientLayout>
    );

    expect(screen.getByText("Profile Img")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("renders Unknown User when name is not provided", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(
      <DashboardClientLayout user={{ email: "no-name@example.com" }}>
        {mockChildren}
      </DashboardClientLayout>
    );

    expect(screen.getByText("Unknown User")).toBeInTheDocument();
    expect(screen.getByText("no-name@example.com")).toBeInTheDocument();
  });
});
