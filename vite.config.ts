import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [tailwindcss()], // ✅ حذف react() — پروژه Vanilla JS است
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    // ✅ build optimization برای production
    build: {
      outDir: "dist",
      sourcemap: false,
      target: "es2020",
      rollupOptions: {
        output: {
          manualChunks: {
            d3: ["d3"],
            leaflet: ["leaflet"],
            topojson: ["topojson-client"],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
