import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

/**
 * Get authenticated user
 */
async function getAuthenticatedUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

/**
 * Authentication for get user
 */
export async function authenticationForGet(resumeId: string) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  if (!resumeId) throw new Error("Resume ID is required");

  return user;
}
