import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserByClerkId } from "@/actions/user-actions";
import { auth } from "@clerk/nextjs/server";
import { createResume } from "@/actions/resume-actions";
import CreateResumeDialog from "@/components/create-resume-dialog";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Unauthorized access — Clerk userId is missing");
  }

  // Get user from database by clerkId
  const user = await getUserByClerkId(clerkId);

  return (
    <div className="bg-[#131A25] min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[300px] border-r border-gray-700 py-10 flex flex-col items-center gap-6">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center overflow-hidden bg-gray-800">
          {user?.image ? (
            <Image
              src={user?.image}
              alt="Profile"
              width={96}
              height={96}
              priority
              className="rounded-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-400">Profile Img</span>
          )}
        </div>

        {/* User details */}
        <div className="text-center">
          <h2 className="text-gray-100 font-bold text-lg">
            {user?.name || "Unknown User"}
          </h2>
          <p className="text-sm text-[#72839E]">{user?.email}</p>
        </div>

        {/* Navigation buttons */}
        <nav className="w-full flex flex-col items-center justify-center gap-4 text-sm my-6">
          <Link href="/">
            <Button variant="ghost" className="homepage-button-style">
              <FaHome /> Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="homepage-button-style">
              <MdDashboard /> Dashboard
            </Button>
          </Link>
        </nav>

        {/* Create new resume button */}
        <CreateResumeDialog createResume={createResume} />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
