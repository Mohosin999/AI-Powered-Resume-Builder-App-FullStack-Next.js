import { ReactNode } from "react";
import { getUserByClerkId } from "@/actions/user-actions";
import { auth } from "@clerk/nextjs/server";
import DashboardClientLayout from "@/components/dashboard-client-layout";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized access — Clerk userId is missing");
  }

  const user = await getUserByClerkId(clerkId);
  const safeUser = user
    ? {
        name: user.name ?? undefined,
        email: user.email,
        image: user.image ?? undefined,
      }
    : null;

  return (
    <DashboardClientLayout user={safeUser}>{children}</DashboardClientLayout>
  );
}
