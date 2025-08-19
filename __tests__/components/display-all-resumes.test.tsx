import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DisplayAllResumes from "@/components/display-all-resumes";
import { Resume } from "@/utils/type";

// Mock deleteResume
jest.mock("@/actions/resume-actions", () => ({
  deleteResume: jest.fn(),
}));

// Mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock GoToTop
jest.mock("@/components/go-to-top", () => ({
  __esModule: true,
  default: () => <div data-testid="go-to-top" />,
}));

// Prevent console errors
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("DisplayAllResumes", () => {
  const mockResumes: Resume[] = [
    {
      id: "1",
      title: "Frontend Developer Resume",
      userId: "user-1",
      createdAt: new Date("2023-01-01T00:00:00Z"),
      updatedAt: new Date("2023-01-01T00:00:00Z"),
    },
    {
      id: "2",
      title: "Backend Developer Resume",
      userId: "user-2",
      createdAt: new Date("2023-01-01T00:00:00Z"),
      updatedAt: new Date("2023-01-01T00:00:00Z"),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders resume titles", () => {
    render(<DisplayAllResumes allResumes={mockResumes} />);

    expect(screen.getByText("Frontend Developer Resume")).toBeInTheDocument();
    expect(screen.getByText("Backend Developer Resume")).toBeInTheDocument();
  });

  it("renders GoToTop button", () => {
    render(<DisplayAllResumes allResumes={mockResumes} />);
    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
  });
});
