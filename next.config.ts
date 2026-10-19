import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimizes large wedding photos for fast loading on Vercel
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [256, 384, 512, 640, 750, 828, 1080],
    qualities: [75, 90],
  },
};

export default nextConfig;
