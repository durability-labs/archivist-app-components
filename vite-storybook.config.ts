import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" }), svgr({
    svgrOptions: {
      plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
      svgoConfig: {
        floatPrecision: 2,
      },
    },
    // ...
  })],
  worker: {
    rollupOptions: {
      external: ["@durability-labs/archivist-sdk-js"],
      output: {
        globals: {
          "@durability-labs/archivist-sdk-js": "archivist-sdk-js",
        },
      },
    },
  },
});
