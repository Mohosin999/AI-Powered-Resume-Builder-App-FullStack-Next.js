"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
// export async function createResume(formData: FormData) {
//   const title = formData.get("title") as string;

//   if (!title) {
//     throw new Error("Title is required");
//   }

//   const user = await getAuthenticatedUser();
//   if (!user) throw new Error("User not found");

//   await prisma.resume.create({
//     data: {
//       title,
//       userId: user.id,
//     },
//   });

//   revalidatePath("/dashboard");
// }
export async function createResume(formData: FormData) {
  const title = formData.get("title") as string;

  if (!title) {
    throw new Error("Title is required");
  }

  const user = await getAuthenticatedUser();
  if (!user) throw new Error("User not found");

  const resume = await prisma.resume.create({
    data: {
      title,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard");
  return resume.id;
}

export async function updateResume(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;

  if (!id || !title.trim()) {
    throw new Error("ID and Title are required!");
  }

  const user = await getAuthenticatedUser();
  if (!user) throw new Error("User not found");

  await prisma.resume.update({
    where: { id, userId: user.id },
    data: { title },
  });

  revalidatePath("/dashboard");
}

export async function deleteResume(id: string) {
  const user = await getAuthenticatedUser();

  await prisma.resume.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard");
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

/**
 * ========================================================================
 *                             Personal Details
 * ========================================================================
 */
export async function upsertPersonalDetails(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  const resumeId = formData.get("resumeId") as string;
  if (!resumeId) throw new Error("Resume ID is required");

  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string | undefined,
    jobTitle: formData.get("jobTitle") as string,
    socialLink: formData.get("socialLink") as string | undefined,
  };

  // Validate required fields
  if (!data.firstName || !data.lastName || !data.email || !data.jobTitle) {
    throw new Error("Required fields are missing");
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Verify the resume belongs to the user
      const resume = await tx.resume.findUnique({
        where: { id: resumeId, userId: user.id },
      });

      if (!resume) throw new Error("Resume not found or access denied");

      // Upsert the personal details
      await tx.personalDetails.upsert({
        where: { resumeId },
        create: {
          ...data,
          resumeId,
        },
        update: data,
      });
    });

    revalidatePath(`/resumes/${resumeId}/personal-details`);
    // Optionally redirect after successful submission
    redirect(`/resumes/${resumeId}/experiences`);
  } catch (error) {
    console.error("Failed to save personal details:", error);
    throw error;
  }
}

/**
 * ========================================================================
 *                               Summary
 * ========================================================================
 */

/**
 * ========================================================================
 *                              Experiences
 * ========================================================================
 */

/**
 * ========================================================================
 *                             Personal Details
 * ========================================================================
 */

/**
 * ========================================================================
 *                             Personal Details
 * ========================================================================
 */

/**
 * ========================================================================
 *                             Personal Details
 * ========================================================================
 */
