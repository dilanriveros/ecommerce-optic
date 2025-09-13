import type { NextConfig } from "next";

// Configuración de Next.js
const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"]
    }
  }
};

export default nextConfig;
