import * as path from "path";
import swc from "unplugin-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const here = __dirname;

export default defineConfig({
  test: {
    include: ["**/*.spec.ts", "**/*.e2e-spec.ts"],
    globals: true,
    root: "./",
    alias: {
      "@/*": path.resolve(here, "./lib"),
    },
  },
  resolve: {
    alias: {
      "@/*": path.resolve(here, "./lib"),
    },
  },
  plugins: [
    tsconfigPaths(),

    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: "es6" },
    }),
  ],
});
