import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  worker: {
    rollupOptions: {
      external: ["@codex/sdk-js"],
      output: {
        globals: {
          "@codex/sdk-js": "codex-sdk-js",
        },
      },
    },
  },
});
