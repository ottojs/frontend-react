import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";
import pkgjson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Based on this package (use to view options)
    // https://github.com/itgalaxy/favicons
    vitePluginFaviconsInject("./src/assets/vite.svg", {
      appName: "ExampleName",
      appShortName: "ExampleShort",
      appDescription: "ExampleDescription",
      developerName: "ExampleDeveloper",
      developerURL: "https://example.com",
      lang: "en-US",
      background: "#333333",
      appleStatusBarStyle: "default",
      display: "standalone",
      theme_color: "#444444",
    }),
  ],
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
