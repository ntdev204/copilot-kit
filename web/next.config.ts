import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize barrel imports per bundle-barrel-imports rule
  experimental: {
    optimizePackageImports: ["lucide-react", "radix-ui"],
  },
};

export default nextConfig;
