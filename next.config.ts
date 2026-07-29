import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimizes large wedding photos for fast loading on Vercel
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
