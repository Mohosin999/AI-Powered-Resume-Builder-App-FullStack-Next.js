"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// Create Resume
export async function createResume(formData: FormData) {
  const title = formData.get("title") as string;

  if (!title) {
    throw new Error("Title is required");
  }

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) throw new Error("User not found");

  await prisma.resume.create({
    data: {
      title,
      userId: user.id,
    },
  });
}
