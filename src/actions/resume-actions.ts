"use server";

import { prisma } from "@/lib/db";
import { authenticationForGet } from "@/utils/helper-functions";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
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
// Create or Update Personal Details
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
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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

    revalidatePath(`/dashboard/${resumeId}/personal-details`);
    // Optionally redirect after successful submission
    // redirect(`/dashboard/${resumeId}/experiences`);
  } catch (error) {
    console.error("Failed to save personal details:", error);
    throw error;
  }
}

// Get Personal Details
export async function getPersonalDetails(resumeId: string) {
  const user = await authenticationForGet(resumeId);

  return await prisma.personalDetails.findUnique({
    where: { resumeId, resume: { userId: user.id } },
  });
}

/**
 * ========================================================================
 *                               Summary
 * ========================================================================
 */
export async function upsertSummary(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  const resumeId = formData.get("resumeId") as string;
  if (!resumeId) throw new Error("Resume ID is required");

  const content = formData.get("content") as string;

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Verify the resume belongs to the user
      const resume = await tx.resume.findUnique({
        where: { id: resumeId, userId: user.id },
      });

      if (!resume) throw new Error("Resume not found or access denied");

      // Upsert the summary
      await tx.summary.upsert({
        where: { resumeId },
        create: {
          content,
          resumeId,
        },
        update: { content },
      });
    });

    revalidatePath(`/dashboard/${resumeId}/summary`);
    // Optionally redirect after successful submission
    // redirect(`/dashboard/${resumeId}`);
  } catch (error) {
    console.error("Failed to save summary:", error);
    throw error;
  }
}

// Get Summary

export async function getSummary(resumeId: string) {
  const user = await authenticationForGet(resumeId);

  return await prisma.summary.findUnique({
    where: { resumeId, resume: { userId: user.id } },
  });
}

/**
 * ========================================================================
 *                              Experiences
 * ========================================================================
 */
// Get all experience
export async function getExperiences(resumeId: string) {
  const user = await authenticationForGet(resumeId);

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
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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
    return;
  } catch (error) {
    console.error("Failed to delete experience:", error);
    throw error;
  }
}

/**
 * ========================================================================
 *                               Projects
 * ========================================================================
 */
export async function getProjects(resumeId: string) {
  const user = await authenticationForGet(resumeId);

  return await prisma.project.findMany({
    where: { resumeId, resume: { userId: user.id } },
    orderBy: { createdAt: "desc" },
  });
}

// Create or Update
export async function upsertProject(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  const resumeId = formData.get("resumeId") as string;
  if (!resumeId) throw new Error("Resume ID is required");

  const data = {
    id: formData.get("id") as string | undefined,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    url: (formData.get("url") as string) || undefined,
    repoUrl: (formData.get("repoUrl") as string) || undefined,
    caseStudyUrl: (formData.get("caseStudyUrl") as string) || undefined,
  };

  // Validate required fields
  if (!data.name || !data.description) {
    throw new Error("Required fields are missing");
  }

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Verify resume belongs to user
      const resume = await tx.resume.findUnique({
        where: { id: resumeId, userId: user.id },
      });
      if (!resume) throw new Error("Resume not found or access denied");

      // Prepare the data object
      const projectData = {
        name: data.name,
        description: data.description,
        url: data.url,
        repoUrl: data.repoUrl,
        caseStudyUrl: data.caseStudyUrl,
        resumeId,
      };

      if (data.id) {
        // Update existing project
        await tx.project.update({
          where: { id: data.id },
          data: projectData,
        });
      } else {
        // Create new project
        await tx.project.create({
          data: projectData,
        });
      }
    });

    revalidatePath(`/dashboard/${resumeId}/projects`);
  } catch (error) {
    console.error("Failed to upsert project:", error);
    throw error;
  }
}

// Delete
export async function deleteProject(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  if (!id) throw new Error("Project ID is required");

  try {
    const project = await prisma.project.findFirst({
      where: { id, resume: { userId: user.id } },
    });

    if (!project) throw new Error("Project not found or access denied");

    await prisma.project.delete({ where: { id } });
    revalidatePath(`/dashboard/${project.resumeId}/projects`);
    return;
  } catch (error) {
    console.error("Failed to delete project:", error);
    throw error;
  }
}

/**
 * ========================================================================
 *                               Education
 * ========================================================================
 */
export async function getEducations(resumeId: string) {
  const user = await authenticationForGet(resumeId);

  return await prisma.education.findMany({
    where: { resumeId, resume: { userId: user.id } },
    orderBy: { startDate: "desc" },
  });
}

export async function upsertEducation(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  const resumeId = formData.get("resumeId") as string;
  if (!resumeId) throw new Error("Resume ID is required");

  const data = {
    id: formData.get("id") as string | undefined,
    institution: formData.get("institution") as string,
    degree: formData.get("degree") as string,
    field: (formData.get("field") as string) || undefined,
    startDate: formData.get("startDate") as string,
    endDate: (formData.get("endDate") as string) || undefined,
    current: formData.get("current") === "on",
  };

  if (!data.institution || !data.degree || !data.startDate) {
    throw new Error("Required fields are missing");
  }

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const resume = await tx.resume.findUnique({
        where: { id: resumeId, userId: user.id },
      });
      if (!resume) throw new Error("Resume not found or access denied");

      const educationData = {
        institution: data.institution,
        degree: data.degree,
        field: data.field,
        startDate: data.startDate,
        endDate: data.current ? null : data.endDate,
        current: data.current,
        resumeId,
      };

      if (data.id) {
        await tx.education.update({
          where: { id: data.id },
          data: educationData,
        });
      } else {
        await tx.education.create({
          data: educationData,
        });
      }
    });

    revalidatePath(`/dashboard/${resumeId}/education`);
  } catch (error) {
    console.error("Failed to upsert education:", error);
    throw error;
  }
}

export async function deleteEducation(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  if (!id) throw new Error("Education ID is required");

  try {
    const education = await prisma.education.findFirst({
      where: { id, resume: { userId: user.id } },
    });

    if (!education) throw new Error("Education not found or access denied");

    await prisma.education.delete({ where: { id } });
    revalidatePath(`/dashboard/${education.resumeId}/education`);
    return;
  } catch (error) {
    console.error("Failed to delete education:", error);
    throw error;
  }
}

/**
 * ========================================================================
 *                                 Skills
 * ========================================================================
 */
export async function getSkills(resumeId: string) {
  const user = await authenticationForGet(resumeId);

  return await prisma.skill.findMany({
    where: { resumeId, resume: { userId: user.id } },
    orderBy: { createdAt: "asc" },
  });
}

export async function createSkill(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  const resumeId = formData.get("resumeId") as string;
  const name = formData.get("name") as string;

  if (!resumeId) throw new Error("Resume ID is required");
  if (!name) throw new Error("Skill name is required");

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const resume = await tx.resume.findUnique({
        where: { id: resumeId, userId: user.id },
      });
      if (!resume) throw new Error("Resume not found or access denied");

      await tx.skill.create({
        data: {
          name,
          resumeId,
        },
      });
    });

    revalidatePath(`/dashboard/${resumeId}/skills`);
  } catch (error) {
    console.error("Failed to create skill:", error);
    throw error;
  }
}

export async function deleteSkill(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  if (!id) throw new Error("Skill ID is required");

  try {
    const skill = await prisma.skill.findFirst({
      where: { id, resume: { userId: user.id } },
    });

    if (!skill) throw new Error("Skill not found or access denied");

    await prisma.skill.delete({ where: { id } });
    revalidatePath(`/dashboard/${skill.resumeId}/skills`);
    return;
  } catch (error) {
    console.error("Failed to delete skill:", error);
    throw error;
  }
}
