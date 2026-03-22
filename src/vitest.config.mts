import * as path from "path";
import { defineConfig } from "vitest/config";

const here = __dirname;

export default defineConfig({
  test: {
    include: ["**/*.spec.ts", "**/*.e2e-spec.ts"],
    globals: true,
    root: "./",
    alias: {
      "@/*": path.resolve(here, "."),
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@/*": path.resolve(here, "."),
    },
  },
  ssr: {
    noExternal: ["zod"],
  },
});
