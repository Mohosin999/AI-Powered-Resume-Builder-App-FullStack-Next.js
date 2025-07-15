"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Helper function to get authenticated user
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

  revalidatePath("/dashboard");
}

export async function updateResume(id: string, title: string) {
  const user = await getAuthenticatedUser();

  return await prisma.resume.update({
    where: {
      id,
      userId: user.id,
    },
    data: { title },
  });
}

export async function getResumes() {
  const user = await getAuthenticatedUser();

  return await prisma.resume.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function getResumeById(id: string) {
  const user = await getAuthenticatedUser();

  return await prisma.resume.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      personalDetails: true,
      summary: true,
      experiences: true,
      projects: true,
      educations: true,
      skills: true,
    },
  });
}
