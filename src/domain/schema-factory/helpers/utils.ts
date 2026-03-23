export function isPlainObject(val: unknown): val is Record<string, unknown> {
  if (typeof val !== "object" || val === null) return false;
  const proto = Object.getPrototypeOf(val);
  return proto === Object.prototype || proto === null;
}

/**
 * Preprocess for object-id reference schemas in coerce mode.
 *
 * Normalizes absence-of-relation representations to null:
 * - null, undefined, false → null
 * - "null", "undefined" → null
 * - { id: "" | null | undefined | false } → null
 * - {} (no id field) → null
 */
export function objectIdPreprocess(value: unknown): unknown {
  if (value === null || value === undefined || value === false) return null;
  if (value === "null" || value === "undefined") return null;

  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    if (!("id" in value)) return null;

    const id = (value as Record<string, unknown>).id;
    if (id === "" || id === null || id === undefined || id === false) return null;
  }

  return value;
}
