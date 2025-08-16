import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PersonalDetailsPage from "@/app/dashboard/[id]/personal-details/page";
import { getPersonalDetails } from "@/actions/resume-actions";

// Mock getPersonalDetails
jest.mock("../../src/actions/resume-actions", () => ({
  getPersonalDetails: jest.fn(),
}));

// Mock PersonalDetailsForm
jest.mock(
  "../../src/app/dashboard/[id]/personal-details/personal-details-form",
  () => {
    interface MockPersonalDetailsFormProps {
      resumeId: string;
      personalDetails: {
        firstName: string;
        lastName: string;
        email: string;
      };
    }

    return {
      __esModule: true,
      default: ({
        resumeId,
        personalDetails,
      }: MockPersonalDetailsFormProps) => (
        <div data-testid="mock-personal-details-form">
          Form for {resumeId} - {personalDetails.firstName}
        </div>
      ),
    };
  }
);

// Mock the GoToTop Component
jest.mock("../../src/components/go-to-top", () => {
  const MockGoToTop = () => <div data-testid="mock-go-to-top" />;
  MockGoToTop.displayName = "GoToTop";
  return MockGoToTop;
});

describe("PersonalDetailsPage", () => {
  it("renders form with default values and GoToTop button", async () => {
    const fakeId = "resume-456";
    (getPersonalDetails as jest.Mock).mockResolvedValue({
      firstName: "John",
      lastName: "Doe",
      email: "john@example",
    });

    const ui = await PersonalDetailsPage({ params: { id: fakeId } });
    render(ui);

    expect(screen.getByTestId("mock-personal-details-form")).toHaveTextContent(
      `Form for ${fakeId} - John`
    );
    expect(screen.getByTestId("mock-go-to-top")).toBeInTheDocument();
  });

  it("renders empty default values if personalDetails is null", async () => {
    const fakeId = "resume-456";
    (getPersonalDetails as jest.Mock).mockResolvedValue(null);

    const ui = await PersonalDetailsPage({ params: { id: fakeId } });
    render(ui);

    expect(screen.getByTestId("mock-personal-details-form")).toHaveTextContent(
      `Form for ${fakeId} -`
    );

    expect(screen.getByTestId("mock-go-to-top")).toBeInTheDocument();
  });
});
