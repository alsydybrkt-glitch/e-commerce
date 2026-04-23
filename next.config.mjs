/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,

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
    // Disable experimental optimizeCss to reduce overhead during development and builds
    // optimizeCss: {
    //   preload: 'swap',
    //   inlineFonts: true,
    //   minify: true,
    // },

    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@mui/material",
      "@mui/icons-material",
      "framer-motion",
      "recharts",
      "clsx"
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  transpilePackages: ["swiper"],
};


export default nextConfig;
