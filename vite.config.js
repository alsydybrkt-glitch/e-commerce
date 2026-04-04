import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise warning threshold — MUI alone is ~500KB minified
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          const normalizedId = id.split("\\").join("/");

          // React core — highest priority, check first
          if (
            normalizedId.includes("/react/") ||
            normalizedId.includes("/react-dom/") ||
            normalizedId.includes("react-router") ||
            normalizedId.includes("scheduler")
          ) {
            return "react-vendor";
          }

          // MUI — very large, isolate to its own chunk
          if (
            normalizedId.includes("@mui/") ||
            normalizedId.includes("@emotion/")
          ) {
            return "mui-vendor";
          }

          // State management
          if (
            normalizedId.includes("@reduxjs/toolkit") ||
            normalizedId.includes("react-redux") ||
            normalizedId.includes("redux")
          ) {
            return "state-vendor";
          }

          // Icons — large and rarely changes, good cache candidate
          if (normalizedId.includes("react-icons")) {
            return "icons-vendor";
          }

          // UI animation & interaction libs
          if (
            normalizedId.includes("framer-motion") ||
            normalizedId.includes("swiper") ||
            normalizedId.includes("react-hot-toast")
          ) {
            return "ui-vendor";
          }

          // HTTP client — isolated for clarity
          if (normalizedId.includes("axios")) {
            return "http-vendor";
          }

          // Everything else (postcss, etc.)
          return "vendor";
        },
      },
    },
  },
});
