import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — loads first
          "vendor-react": ["react", "react-dom"],
          // GSAP — large, split out so it loads in parallel
          "vendor-gsap": ["gsap"],
          // Leaflet — only needed for Location section
          "vendor-leaflet": ["leaflet"],
          // EmailJS — only needed for Contact section
          "vendor-emailjs": ["@emailjs/browser"],
          // Lenis — small but separate so it doesn't block React
          "vendor-lenis": ["lenis"],
        },
      },
    },
    // Raise chunk size warning limit — GSAP + Leaflet are naturally large
    chunkSizeWarningLimit: 600,
  },
});
