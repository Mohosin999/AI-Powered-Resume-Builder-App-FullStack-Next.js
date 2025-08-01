// "use client";

// import { ReactNode } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import CreateResumeDialog from "@/components/create-resume-dialog";
// import { Button } from "@/components/ui/button";
// import { FaHome } from "react-icons/fa";
// import { MdDashboard } from "react-icons/md";
// import { createResume } from "@/actions/resume-actions";

// interface DashboardClientLayoutProps {
//   children: ReactNode;
//   user: {
//     name?: string;
//     email?: string;
//     image?: string;
//   } | null;
// }

// export default function DashboardClientLayout({
//   children,
//   user,
// }: DashboardClientLayoutProps) {
//   const pathname = usePathname();
//   const actualPathName = pathname.split("/").pop();

//   if (actualPathName === "preview-resume") {
//     return <div>{children}</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row">
//       {/* Sidebar */}
//       <aside className="w-[300px] border-r border-gray-700 py-14 flex flex-col items-center gap-6">
//         {/* Profile Image */}
//         <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center overflow-hidden bg-gray-800">
//           {user?.image ? (
//             <Image
//               src={user.image}
//               alt="Profile"
//               width={96}
//               height={96}
//               priority
//               className="rounded-full object-cover"
//             />
//           ) : (
//             <span className="text-sm text-gray-400">Profile Img</span>
//           )}
//         </div>

//         {/* User details */}
//         <div className="text-center">
//           <h2 className="text-gray-100 font-bold text-lg">
//             {user?.name || "Unknown User"}
//           </h2>
//           <p className="text-sm text-[#72839E]">{user?.email}</p>
//         </div>

//         {/* Navigation buttons */}
//         <nav className="w-full flex flex-col items-center justify-center gap-4 text-sm my-6">
//           <Link href="/">
//             <Button variant="ghost" className="homepage-button-style">
//               <FaHome /> Home
//             </Button>
//           </Link>
//           <Link href="/dashboard">
//             <Button variant="ghost" className="homepage-button-style">
//               <MdDashboard /> Dashboard
//             </Button>
//           </Link>
//         </nav>

//         {/* Create new resume button */}
//         <CreateResumeDialog createResume={createResume} />
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-14">{children}</main>
//     </div>
//   );
// }

"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CreateResumeDialog from "@/components/create-resume-dialog";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { createResume } from "@/actions/resume-actions";

interface DashboardClientLayoutProps {
  children: ReactNode;
  user: {
    name?: string;
    email?: string;
    image?: string;
  } | null;
}

export default function DashboardClientLayout({
  children,
  user,
}: DashboardClientLayoutProps) {
  const pathname = usePathname();
  const actualPathName = pathname.split("/").pop();

  if (actualPathName === "preview-resume") {
    return <div>{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-[260px] lg:w-[300px] md:border-r md:border-gray-700 py-10 lg:py-14 flex flex-col items-center gap-6">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center overflow-hidden bg-gray-800">
          {user?.image ? (
            <Image
              src={user.image}
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
        <nav className="w-full flex flex-col items-center justify-center gap-4 text-sm my-2 lg:my-6">
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
      <main className="flex-1 px-3 pt-4 pb-10 md:p-10 lg:p-14">{children}</main>
    </div>
  );
}
