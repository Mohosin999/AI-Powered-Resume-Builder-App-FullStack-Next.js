import { NextRequest, NextResponse } from "next/server";
import {
  authenticateForPOST,
  handleServerError,
} from "@/utils/helper-functions";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

/** ============================================================================
 * POST /api/personal-details
 * Creates or updates personal details for a given resume.
==============================================================================*/
export async function POST(req: NextRequest) {
  try {
    const { errorResponse, user, resumeId, formData } =
      await authenticateForPOST(req);
    if (errorResponse) return errorResponse;

    // Get form data
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      jobTitle: formData.get("jobTitle") as string,
      socialLink: formData.get("socialLink") as string,
    };

    // Validate required fields
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.jobTitle ||
      !data.socialLink
    ) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Create or update the personal details associated with the resume
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const resume = await tx.resume.findUnique({
        where: { id: resumeId, userId: user.id },
      });

      if (!resume) {
        throw new Error("Resume not found or access denied");
      }

      await tx.personalDetails.upsert({
        where: { resumeId },
        create: {
          ...data,
          resumeId,
        },
        update: data,
      });
    });

    // Revalidate cache path
    revalidatePath(`/dashboard/${resumeId}/personal-details`);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Failed to add personal details:", error);
    return handleServerError(error);
  }
}

/** ============================================================================
 * GET /api/personal-details?resumeId=abc123
 * Fetches personal details for the given resumeId from query parameters.
==============================================================================*/
// export async function GET(req: NextRequest) {
//   try {
//     const user = await getAuthenticatedUser();

//     // Check if user is authenticated
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Extract resumeId from query parameters
//     const { searchParams } = new URL(req.url);
//     const resumeId = searchParams.get("resumeId");

//     // Validate resumeId
//     if (!resumeId) {
//       return NextResponse.json(
//         { error: "Resume ID is required" },
//         { status: 400 }
//       );
//     }

//     // Fetch personal details from DB
//     const personalDetails = await prisma.personalDetails.findUnique({
//       where: { resumeId },
//     });

//     // Return 404 if not found
//     if (!personalDetails) {
//       return NextResponse.json(
//         { error: "Personal details not found" },
//         { status: 404 }
//       );
//     }

//     // Return success response
//     return NextResponse.json({ data: personalDetails }, { status: 200 });
//   } catch (error: unknown) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Internal Server Error";

//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }
