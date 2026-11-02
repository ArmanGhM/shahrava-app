import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    // ✅ این بخش را اضافه کنید
    optimizeDeps: {
      include: ["maplibre-gl", "@maplibre/maplibre-gl-leaflet"],
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      target: "es2020",
      rollupOptions: {
        output: {
          manualChunks: {
            maplibre: ["maplibre-gl"],
            leaflet: ["leaflet"],
            d3: ["d3"],
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
