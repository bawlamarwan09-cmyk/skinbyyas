import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The Cloudflare ASSETS and IMAGES bindings only exist in production.
    // In local development, serve the already-optimized WebP files directly.
    unoptimized: process.env.NODE_ENV !== "production",
  },
};

export default nextConfig;
