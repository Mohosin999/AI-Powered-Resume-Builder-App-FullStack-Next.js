import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserByClerkId } from "@/actions/user-actions";
import { auth } from "@clerk/nextjs/server";
import { createResume } from "@/actions/resume-actions";
import CreateResumeDialog from "@/components/CreateResumeDialog";

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

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[300px] border-r border-gray-700 p-6 flex flex-col items-center gap-6">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center overflow-hidden bg-gray-800">
          {user?.image ? (
            <Image
              src={user?.image}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-400">Profile Img</span>
          )}
        </div>

        {/* Name and Email */}
        <div className="text-center">
          <h2 className="font-bold text-lg">{user?.name || "Unknown User"}</h2>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>

        {/* Navigation Links */}
        <nav className="w-full flex flex-col items-start gap-2 text-sm">
          <Link href="/" className="flex items-center gap-2 hover:underline">
            🏠 Home
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-green-400 underline"
          >
            🧾 Dashboard
          </Link>
        </nav>

        {/* Create Resume Button */}
        {/* <div className="mt-4 border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
          Create New Resume
        </div> */}
        <CreateResumeDialog action={createResume} />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
