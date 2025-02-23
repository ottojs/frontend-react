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
    vitePluginFaviconsInject("./src/assets/favicon.svg", {
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
  //base: "https://127.0.0.1:3000/",
  server: {
    // host: true,
    port: 3111,
    // strictPort: true,
    // https: false,
    // open: false,
    // cors: false,
    // origin: "http://127.0.0.1:3000",
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Content-Security-Policy":
        "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self' http://localhost:8080 https://storage.googleapis.com; font-src 'self'; object-src 'none'; media-src 'self' blob:; frame-src 'none'; report-uri http://localhost:8080/csp-report; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; manifest-src 'self'; script-src-attr 'none'; upgrade-insecure-requests",
    },
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
