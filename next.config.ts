import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL || "file:./dev.db",
    NEXTAUTH_SECRET:
      process.env.NEXTAUTH_SECRET ||
      "ats-resume-builder-super-secret-jwt-key-2025-production-32chars",
  },
};

export default nextConfig;
