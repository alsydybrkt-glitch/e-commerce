/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.dummyjson.com",
      },
      {
        protocol: "http",
        hostname: "**.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536, 1920],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "react-icons", "@mui/material", "@mui/icons-material", "framer-motion", "recharts"],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  transpilePackages: ["swiper"],
};

export default nextConfig;
