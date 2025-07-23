#!/usr/bin/env tsx
import { parseArgs } from "util";
import { buildOpenApiFile } from "./core/build-openapi-file";
import { Options } from "./typings/options";

async function main() {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      apiPrefix: {
        type: "string",
        default: "/",
      },
      outFile: {
        type: "string",
        default: `./generated-${Date.now()}.json`,
      },
    },
    strict: true,
    allowPositionals: true,
  });

  const options: Options = {
    apiPrefix: {
      path: values.apiPrefix,
      exclude: ["health"],
    },

    outFile: values.outFile,
  };

  await buildOpenApiFile(options);
}

main();
