import { z } from "zod";
import { createSchema } from "../../create-schema";

const INVALID_TOKENS = new Set(["NaN", "Infinity", "-Infinity", "null", "undefined"]);

/**
 * Preprocess function for safe number coercion.
 *
 * Exported so that derived schemas (IntSchema, IdIntSchema) can reuse the
 * same coercion logic with their own inner Zod schema (e.g. `z.number().int()`).
 */

export function numberPreprocess(value: unknown): unknown {
  if (value === null || value === undefined) return value;

  // Guards explícitos — rejeição documentada como decisão de design.
  // Number(false)===0 e Number(true)===1 mascaram erros de tipo.
  if (typeof value === "boolean") return value;
  // Number([])===0 e Number([42])===42 são duplamente perigosos.
  if (Array.isArray(value)) return value;
  // Number({})===NaN já falharia, mas rejeição explícita por clareza.
  if (typeof value === "object") return value;

  if (typeof value === "string") {
    const trimmed = value.trim();

    // String vazia ou whitespace-only → ausência, nunca 0.
    if (trimmed === "") return undefined;

    // Rejeitar tokens semanticamente inválidos para dados.
    if (INVALID_TOKENS.has(trimmed)) return value;

    const parsed = Number(trimmed);

    // Rejeitar NaN e Infinity resultantes do parse.
    if (!Number.isFinite(parsed)) return value;

    return parsed;
  }

  // Rejeitar NaN/Infinity em runtime.
  if (typeof value === "number" && !Number.isFinite(value)) return value;

  return value;
}

export const NumberSchema = createSchema((standard) => {
  const base = z.number();
  if (!standard.coerce) return base;
  return z.preprocess(numberPreprocess, base);
});

/**
 * Creates a safe integer schema with optional coercion.
 *
 * Use this to build integer schemas with constraints (`.min()`, `.max()`, etc.)
 * that also support safe coercion from strings in presentation layer.
 *
 * @example
 * ```ts
 * schema: createSchema((standard) => safeInt(standard, (s) => s.min(0).max(99999)))
 * schema: createSchema((standard) => safeInt(standard)) // plain int, no extra constraints
 * ```
 */

export function safeInt(
  standard: { coerce: boolean },
  configure?: (schema: z.ZodNumber) => z.ZodNumber,
) {
  const base = configure ? configure(z.number().int()) : z.number().int();
  if (!standard.coerce) return base;
  return z.preprocess(numberPreprocess, base);
}
