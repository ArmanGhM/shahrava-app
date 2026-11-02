import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [tailwindcss()],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL(".", import.meta.url)),
      },
    },

    // ─── Pre-bundling وابستگی‌های سنگین در dev server ───
    // ⚠️ اگر maplibre-gl را نصب نکرده‌ای، این بخش را کامنت کن
    // نصب: npm i maplibre-gl @maplibre/maplibre-gl-leaflet
    optimizeDeps: {
      include: ["maplibre-gl", "@maplibre/maplibre-gl-leaflet"],
    },

    build: {
      outDir: "dist",
      sourcemap: false,
      target: "es2020",

      rollupOptions: {
        output: {
          // ✅ Vite 8 / rolldown فقط function را قبول می‌کند
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            if (id.includes("maplibre-gl")) return "maplibre";
            if (id.includes("leaflet")) return "leaflet";
            if (id.includes("/d3-") || id.includes("/d3/")) return "d3";
            if (id.includes("react")) return "react";

            return "vendor";
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
