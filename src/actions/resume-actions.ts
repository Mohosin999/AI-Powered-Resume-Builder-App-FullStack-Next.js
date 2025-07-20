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
// Get all experience
export async function getExperiences(resumeId: string) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  return await prisma.experience.findMany({
    where: { resumeId, resume: { userId: user.id } },
    orderBy: { startDate: "desc" },
  });
}

// Create or Update
export async function upsertExperience(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  const resumeId = formData.get("resumeId") as string;
  if (!resumeId) throw new Error("Resume ID is required");

  const data = {
    id: formData.get("id") as string | undefined,
    jobTitle: formData.get("jobTitle") as string,
    company: formData.get("company") as string,
    location: (formData.get("location") as string) || undefined,
    startDate: formData.get("startDate") as string,
    endDate: (formData.get("endDate") as string) || undefined,
    current: formData.get("current") === "on",
    description: formData.get("description") as string,
  };

  // Validate required fields
  if (!data.jobTitle || !data.company || !data.startDate || !data.description) {
    throw new Error("Required fields are missing");
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Verify resume belongs to user
      const resume = await tx.resume.findUnique({
        where: { id: resumeId, userId: user.id },
      });
      if (!resume) throw new Error("Resume not found or access denied");

      // Prepare the data object
      const experienceData = {
        jobTitle: data.jobTitle,
        company: data.company,
        location: data.location,
        startDate: data.startDate,
        endDate: data.current ? null : data.endDate, // Clear endDate if current
        current: data.current,
        description: data.description,
        resumeId,
      };

      if (data.id) {
        // Update existing experience
        await tx.experience.update({
          where: { id: data.id },
          data: experienceData,
        });
      } else {
        // Create new experience
        await tx.experience.create({
          data: experienceData,
        });
      }
    });

    revalidatePath(`/dashboard/${resumeId}/experiences`);
    // redirect(`/dashboard/${resumeId}/experiences`);
  } catch (error) {
    console.error("Failed to upsert experience:", error);
    throw error;
  }
}

// Delete
export async function deleteExperience(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  if (!id) throw new Error("Experience ID is required");

  try {
    const experience = await prisma.experience.findFirst({
      where: { id, resume: { userId: user.id } },
    });

    if (!experience) throw new Error("Experience not found or access denied");

    await prisma.experience.delete({ where: { id } });
    revalidatePath(`/dashboard/${experience.resumeId}/experiences`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete experience:", error);
    throw error;
  }
}

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
