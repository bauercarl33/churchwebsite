import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Same port Create React App used.
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
  build: {
    // Keep CRA's output folder so the existing deployment keeps working.
    outDir: "build",
    // Emit one stylesheet, as CRA did. The page stylesheets were written
    // assuming they are all loaded globally (shared class names such as
    // .title, .header, .image-wrapper), so splitting CSS per lazy-loaded page
    // would make styling depend on which pages were visited first.
    cssCodeSplit: false,
    // Browsers matching CRA's former "production" browserslist.
    target: ["es2020", "chrome87", "edge88", "firefox78", "safari14"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    css: false,
    restoreMocks: true,
  },
});
