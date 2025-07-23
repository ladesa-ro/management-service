import fs from "node:fs/promises";
import path from "node:path";
import { Options } from "../typings/options";
import { buildOpenApiDocument } from "./build-openapi-document";

export async function buildOpenApiFile(options: Options) {
  const document = await buildOpenApiDocument(options);
  const stringified = JSON.stringify(document, null, 2);

  await fs.mkdir(path.dirname(options.outFile), { recursive: true });
  await fs.writeFile(options.outFile, stringified);
}
