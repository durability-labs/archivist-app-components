import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { extname, relative } from "path";
import { fileURLToPath } from "node:url";
import { globSync } from "glob";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
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
  plugins: [
    react(),
    libInjectCss(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      rollupTypes: true,
    }),
    svgr({
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: {
          floatPrecision: 2,
        },
      },
      // ...
    })
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
        "@durability-labs/archivist-sdk-js",
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
          "@durability-labs/archivist-sdk-js": "archivist-sdk-js",
        },
      },
    },
  },
});
