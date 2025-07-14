"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncUser } from "./user-actions";

export const createOrUpdateUserInfo = async (
  prevState: any,
  formData: FormData
) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: "Unauthorized", success: false };
  }

  try {
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      address: (formData.get("address") as string) || null,
      city: (formData.get("city") as string) || null,
      country: (formData.get("country") as string) || null,
    };

    // Check if user exists, if not create one
    const user = await prisma.user.upsert({
      where: { clerkUserId: userId },
      create: { clerkUserId: userId },
      update: {},
    });

    // Create or update user info
    await prisma.userInfo.upsert({
      where: { userId: user.id },
      create: {
        ...data,
        userId: user.id,
      },
      update: data,
    });

    // Redirect to dashboard on success
    redirect("/dashboard");

    // This return won't be reached, but TypeScript needs it
  } catch (error) {
    console.error(error);
    return { message: "Failed to save information", success: false };
  }
};

export const getUserInfo = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: { userInfo: true },
  });

  return user?.userInfo || null;
};
