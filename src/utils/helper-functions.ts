import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

/** ============================================================================
 *                           Get authenticated user
==============================================================================*/
export async function getAuthenticatedUser() {
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

/** ============================================================================
 *                       Authenticate for POST request
==============================================================================*/
export async function authenticateForPOST(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return {
      errorResponse: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  const formData = await req.formData();
  const resumeId = formData.get("resumeId") as string;

  if (!resumeId) {
    return {
      errorResponse: NextResponse.json(
        { error: "Resume ID is required" },
        { status: 400 }
      ),
    };
  }

  return { user, resumeId, formData };
}

/** ============================================================================
 *                       Authenticate for GET request
==============================================================================*/
export async function authenticateForGET(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return {
      errorResponse: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  const { searchParams } = new URL(req.url);
  const resumeId = searchParams.get("resumeId");

  if (!resumeId) {
    return {
      errorResponse: NextResponse.json(
        { error: "Resume ID is required" },
        { status: 400 }
      ),
    };
  }

  return { user, resumeId };
}

/** ============================================================================
 *                         Handle server error
==============================================================================*/
export function handleServerError(error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : "Internal Server Error";
  return NextResponse.json({ error: errorMessage }, { status: 500 });
}
