import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react/"))
              return "vendor-react";
            if (id.includes("gsap")) return "vendor-gsap";
            if (id.includes("leaflet")) return "vendor-leaflet";
            if (id.includes("@emailjs")) return "vendor-emailjs";
            if (id.includes("lenis")) return "vendor-lenis";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
