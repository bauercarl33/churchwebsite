import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Preload the main (Latin) Montserrat file so text can render in the right
 * font on first paint instead of swapping from the fallback font later
 * (which shifts the layout). The file name has a content hash, so it is
 * found in the bundle at build time.
 */
function preloadFont(prefix) {
  return {
    name: "preload-font",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html, { bundle }) {
        const file = Object.keys(bundle ?? {}).find(
          (name) => name.startsWith(`assets/${prefix}`) && name.endsWith(".woff2")
        );
        if (!file) return html;
        return [
          {
            tag: "link",
            attrs: { rel: "preload", href: `/${file}`, as: "font", type: "font/woff2", crossorigin: "" },
            injectTo: "head",
          },
        ];
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadFont("montserrat-latin-wght-normal")],
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
