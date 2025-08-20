"use server";
import { prisma } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * ================================================================
 *                   Sync User Within Database
 * ================================================================
 */
export const syncUser = async () => {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return;

    // Check if user exist
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || "Anonymous"} ${user.lastName || "User"}`,
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
};

// Get user by id
export const getUserByClerkId = async (clerkId: string) => {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
};

// Get userId from database
export const getDbUserId = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("User not found");

  return user.id;
};
