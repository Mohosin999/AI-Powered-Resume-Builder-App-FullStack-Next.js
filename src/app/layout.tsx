// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "AI Resume Builder - Create Professional Resumes Instantly",
//   description:
//     "Build your professional resume in minutes with our AI-powered resume builder. Generate job-ready resumes, summaries, experience details, and more using smart AI suggestions.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${inter.className} antialiased bg-[#131A25]`}
//         suppressHydrationWarning
//       >
//         <ClerkProvider>
//           <div id="header-footer">
//             <Navbar />
//           </div>
//           {children}
//           <div id="header-footer">
//             <Footer />
//           </div>

//           <ToastContainer
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             // theme="dark"
//             theme="light"
//           />
//         </ClerkProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Resume Builder - Create Professional Resumes Instantly",
  description:
    "Build your professional resume in minutes with our AI-powered resume builder. Generate job-ready resumes, summaries, experience details, and more using smart AI suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-[#F4F2EE] dark:bg-[#131A25]`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div id="header-footer">
              <Navbar />
            </div>
            {children}
            <div id="header-footer">
              <Footer />
            </div>

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              // theme="dark"
              theme="light"
            />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
