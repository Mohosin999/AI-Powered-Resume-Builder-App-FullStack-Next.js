// __tests__/user-actions.test.ts
import {
  syncUser,
  getUserByClerkId,
  getDbUserId,
} from "@/actions/user-actions";
import { prisma } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

// Mock prisma and clerk
jest.mock("@/lib/db", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
  currentUser: jest.fn(),
}));

describe("user-actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("syncUser", () => {
    it("should return early if no userId or user", async () => {
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: null });
      (currentUser as jest.Mock).mockResolvedValue(null);

      const result = await syncUser();
      expect(result).toBeUndefined();
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it("should return existing user if found", async () => {
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: "clerk123" });
      (currentUser as jest.Mock).mockResolvedValue({});

      const mockUser = { id: "1", clerkId: "clerk123" };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await syncUser();
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { clerkId: "clerk123" },
      });
      expect(result).toEqual(mockUser);
    });

    it("should create new user if not found", async () => {
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: "clerk123" });
      (currentUser as jest.Mock).mockResolvedValue({
        firstName: "John",
        lastName: "Doe",
        emailAddresses: [{ emailAddress: "john@example.com" }],
        imageUrl: "http://image.com/john.jpg",
      });

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const mockCreatedUser = { id: "2", clerkId: "clerk123" };
      (prisma.user.create as jest.Mock).mockResolvedValue(mockCreatedUser);

      const result = await syncUser();
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          clerkId: "clerk123",
          name: "John Doe",
          email: "john@example.com",
          image: "http://image.com/john.jpg",
        },
      });
      expect(result).toEqual(mockCreatedUser);
    });

    it("should catch and log errors", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      (auth as unknown as jest.Mock).mockRejectedValue(new Error("Auth error"));

      await syncUser();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in syncUser",
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe("getUserByClerkId", () => {
    it("should return user by clerkId", async () => {
      const mockUser = { id: "1", clerkId: "clerk123" };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserByClerkId("clerk123");
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { clerkId: "clerk123" },
      });
      expect(result).toEqual(mockUser);
    });

    it("should return null if user not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getUserByClerkId("unknown");
      expect(result).toBeNull();
    });
  });

  describe("getDbUserId", () => {
    it("should return null if no clerkId", async () => {
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: null });

      const result = await getDbUserId();
      expect(result).toBeNull();
    });

    it("should return user id if found", async () => {
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: "clerk123" });
      const mockUser = { id: "1", clerkId: "clerk123" };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await getDbUserId();
      expect(result).toEqual("1");
    });

    it("should throw error if user not found", async () => {
      (auth as unknown as jest.Mock).mockResolvedValue({ userId: "clerk123" });
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(getDbUserId()).rejects.toThrow("User not found");
    });
  });
});
