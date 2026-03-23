import type { ExtraSchemaOptions, StandardSchemaOptions } from "./schema-options";

export function buildCacheKey(standard: StandardSchemaOptions, extra?: ExtraSchemaOptions): string {
  const base = `${standard.mode}|${standard.strict}|${standard.coerce}`;

  if (!extra || Object.keys(extra).length === 0) {
    return base;
  }

  return `${base}|${JSON.stringify(extra)}`;
}
