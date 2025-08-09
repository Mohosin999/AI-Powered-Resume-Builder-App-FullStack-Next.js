import { prisma } from "@/lib/db";
import {
  authenticateForPOST,
  handleServerError,
} from "@/utils/helper-functions";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/** ============================================================================
 * POST /api/experiences
 * Creates or updates experience.
==============================================================================*/
export async function POST(req: NextRequest) {
  try {
    const { errorResponse, user, resumeId, formData } =
      await authenticateForPOST(req);
    if (errorResponse) return errorResponse;

    // Get form data
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
    if (
      !data.jobTitle ||
      !data.company ||
      !data.startDate ||
      !data.description
    ) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Create or update experience
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

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Failded to add experience", error);
    return handleServerError(error);
  }
}
