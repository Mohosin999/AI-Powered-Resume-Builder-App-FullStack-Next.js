// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ["img.clerk.com"],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com"],
  },
  experimental: {
    typedRoutes: false, // 🛑 This disables the broken typed route checks
  },
};

export default nextConfig;
