import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 600,
    minify: "esbuild",
    sourcemap: false,
    target: "es2020",

    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — always needed, cached separately
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "vendor-react";
          }
          // GSAP — split from react so animation updates don't bust react cache
          if (id.includes("node_modules/gsap")) {
            return "vendor-gsap";
          }
          // Leaflet — lazy loaded in Location, but Rollup still chunks it
          if (id.includes("node_modules/leaflet")) {
            return "vendor-leaflet";
          }
          // Lenis — lazy loaded in useSmoothScroll
          if (id.includes("node_modules/lenis")) {
            return "vendor-lenis";
          }
          // EmailJS — only used in Contact
          if (id.includes("node_modules/@emailjs")) {
            return "vendor-emailjs";
          }
        },
      },
    },
  },
});
