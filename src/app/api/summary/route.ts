import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import {
  authenticateForGET,
  authenticateForPOST,
  handleServerError,
} from "@/utils/helper-functions";
import { revalidatePath } from "next/cache";

/** ============================================================================
 * POST /api/summary
 * Creates or updates summary for a given resume.
==============================================================================*/
export async function POST(req: NextRequest) {
  try {
    const { errorResponse, user, resumeId, formData } =
      await authenticateForPOST(req);
    if (errorResponse) return errorResponse;

    const content = formData.get("content") as string;

    // Create or update the summary
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
        update: {
          content,
        },
      });
    });

    revalidatePath(`/dashboard/${resumeId}/summary`);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Failed to save summary:", error);
    return handleServerError(error);
  }
}

/** ============================================================================
 * GET /api/summary
 * Creates or updates summary for a given resume.
==============================================================================*/
export async function GET(req: NextRequest) {
  try {
    const { errorResponse, user, resumeId } = await authenticateForGET(req);
    if (errorResponse) return errorResponse;

    const summary = await prisma.summary.findUnique({
      where: { resumeId, resume: { userId: user.id } },
    });

    if (!summary) {
      return NextResponse.json({ error: "Summary not found" }, { status: 404 });
    }

    return NextResponse.json({ data: summary }, { status: 200 });
  } catch (error: unknown) {
    console.error("Failed to get summary:", error);
    return handleServerError(error);
  }
}
