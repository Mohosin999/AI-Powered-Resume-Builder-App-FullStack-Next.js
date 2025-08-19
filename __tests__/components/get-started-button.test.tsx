import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import GetStartedButton from "@/components/ui/get-started-button";
import { useAuth } from "@clerk/nextjs";

// Mock Clerk
jest.mock("@clerk/nextjs", () => ({
  useAuth: jest.fn(),
  SignUpButton: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock next/navigation
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("GetStartedButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to /dashboard if user is logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({ userId: "user-123" }); // ✅ cast and mock

    render(<GetStartedButton />);
    fireEvent.click(screen.getByText("Get Started for Free"));

    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });

  it("triggers sign-in button click if user is not logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({ userId: null });

    render(<GetStartedButton />);

    const hiddenTrigger = document.getElementById("sign-in-trigger")!; // ✅ grab by ID
    const triggerClickSpy = jest.spyOn(hiddenTrigger, "click");

    fireEvent.click(screen.getByText("Get Started for Free"));

    expect(triggerClickSpy).toHaveBeenCalled();
  });
});
