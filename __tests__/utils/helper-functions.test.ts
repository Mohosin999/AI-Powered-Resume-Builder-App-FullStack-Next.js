import { authenticationForGet } from "@/utils/helper-functions";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

// Mock Clerk auth
jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

// Mock Prisma
jest.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

describe("authenticationForGet", () => {
  const mockUser = { id: "1", clerkId: "user-123", email: "test@example.com" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the user when authenticated and resumeId is provided", async () => {
    // Mock auth returns userId
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: "user-123" });
    // Mock prisma returns user
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const result = await authenticationForGet("resume-123");
    expect(result).toEqual(mockUser);
    expect(auth).toHaveBeenCalled();
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: "user-123" },
    });
  });

  it("throws 'Unauthorized' if auth returns no userId", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: null });

    await expect(authenticationForGet("resume-123")).rejects.toThrow(
      "Unauthorized"
    );
  });

  it("throws 'User not found' if prisma returns null", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: "user-123" });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(authenticationForGet("resume-123")).rejects.toThrow(
      "User not found"
    );
  });

  it("throws 'Resume ID is required' if resumeId is empty", async () => {
    (auth as unknown as jest.Mock).mockResolvedValue({ userId: "user-123" });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    await expect(authenticationForGet("")).rejects.toThrow(
      "Resume ID is required"
    );
  });
});
