import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DashboardLayout from "@/app/dashboard/layout";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/actions/user-actions";

// Mock Clerk auth
jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

// Mock getUserByClerkId
jest.mock("../../src/actions/user-actions", () => ({
  getUserByClerkId: jest.fn(),
}));

// Mock DashboardClientLayout
jest.mock("../../src/components/dashboard-client-layout", () => {
  interface MockUser {
    name?: string;
    email?: string;
  }

  return {
    __esModule: true,
    default: ({
      user,
      children,
    }: {
      user: MockUser | null;
      children: React.ReactNode;
    }) => (
      <div>
        <div data-testid="mock-dashboard-user">{user?.email}</div>
        <div data-testid="mock-dashboard-children">{children}</div>
      </div>
    ),
  };
});

describe("DashboardLayout", () => {
  it("renders children and user info when authenticated", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({
      userId: "fake-clerk-id",
    });

    (getUserByClerkId as jest.Mock).mockResolvedValue({
      name: "John Doe",
      email: "john@example.com",
    });

    const ui = await DashboardLayout({ children: <div>Child Content</div> });
    render(ui);

    expect(screen.getByTestId("mock-dashboard-user")).toHaveTextContent(
      "john@example.com"
    );
    expect(screen.getByTestId("mock-dashboard-children")).toHaveTextContent(
      "Child Content"
    );
  });

  it("throws error if user is not authenticated", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: null });

    await expect(DashboardLayout({ children: <div /> })).rejects.toThrow(
      "Unauthorized access — Clerk userId is missing"
    );
  });
});
