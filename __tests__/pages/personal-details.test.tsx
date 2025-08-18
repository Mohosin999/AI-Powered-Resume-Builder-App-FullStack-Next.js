import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PersonalDetailsPage from "@/app/dashboard/[id]/personal-details/page";
import { getPersonalDetails } from "@/actions/resume-actions";

jest.mock("@/actions/resume-actions", () => ({
  getPersonalDetails: jest.fn(),
}));

jest.mock(
  "@/app/dashboard/[id]/personal-details/personal-details-form",
  () => ({
    __esModule: true,
    default: ({
      resumeId,
      personalDetails,
    }: {
      resumeId: string;
      personalDetails: {
        resumeId: string;
        firstName: string;
        lastName: string;
        email: string;
        jobTitle: string;
        socialLink: string;
      };
    }) => (
      <div data-testid="personal-details-form">
        Form for {resumeId} - {personalDetails.firstName}
      </div>
    ),
  })
);

jest.mock("@/components/go-to-top", () => ({
  __esModule: true,
  default: () => <div data-testid="go-to-top" />,
}));

describe("PersonalDetailsPage", () => {
  const mockId = "resume-456";

  it("renders PersonalDetailsForm with default values", async () => {
    (getPersonalDetails as jest.Mock).mockResolvedValue({
      resumeId: mockId,
      firstName: "John",
      lastName: "Doe",
      email: "john@example",
      jobTitle: "Software Engineer",
      socialLink: "https://example.com",
    });

    const ui = await PersonalDetailsPage({ params: { id: mockId } });
    render(ui);

    expect(screen.getByTestId("personal-details-form")).toHaveTextContent(
      `Form for ${mockId} - John`
    );
  });
  it("renders empty default values if personalDetails is null", async () => {
    (getPersonalDetails as jest.Mock).mockResolvedValue(null);

    const ui = await PersonalDetailsPage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("personal-details-form")).toHaveTextContent(
      `Form for ${mockId} -`
    );
  });

  it("renders GoToTop button", async () => {
    const ui = await PersonalDetailsPage({ params: { id: mockId } });
    render(ui);
    expect(screen.getByTestId("go-to-top")).toBeInTheDocument();
  });
});
