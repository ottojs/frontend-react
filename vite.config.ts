import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkgjson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  publicDir: "static",
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    assetsInlineLimit: 0,
    outDir: "public",
    assetsDir: `v${pkgjson.version}`,
  },
});
