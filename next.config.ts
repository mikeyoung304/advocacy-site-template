import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' to enable API routes for email forwarding
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
