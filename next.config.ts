import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow the sandbox preview proxy origin to fetch dev assets without the
  // cross-origin warning (Next 16 dev-server hardening).
  allowedDevOrigins: ["*.space-z.ai"],
};

export default nextConfig;
