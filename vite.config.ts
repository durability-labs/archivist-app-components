import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  worker: {
    rollupOptions: {
      external: ["@codex/sdk-js"],
    },
  },
});
