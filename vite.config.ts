import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { extname, relative } from "path";
import { fileURLToPath } from "node:url";
import { globSync } from "glob";

// https://vitejs.dev/config/
export default defineConfig({
  worker: {
    rollupOptions: {
      external: ["@codex-storage/sdk-js"],
      output: {
        globals: {
          "@codex-storage/sdk-js": "codex-sdk-js",
        },
      },
    },
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "@codex-storage/sdk-js",
      ],
      input: Object.fromEntries(
        globSync("src/**/*.{ts,tsx}", {
          ignore: ["src/**/*.d.ts"],
        })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative("src", file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        globals: {
          "@codex-storage/sdk-js": "codex-sdk-js",
        },
      },
    },
  },
});
