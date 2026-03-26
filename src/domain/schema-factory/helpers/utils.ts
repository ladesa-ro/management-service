export function isPlainObject(val: unknown): val is Record<string, unknown> {
  if (typeof val !== "object" || val === null) return false;
  const proto = Object.getPrototypeOf(val);
  return proto === Object.prototype || proto === null;
}

/**
 * Preprocess for object-id reference schemas in coerce mode.
 *
 * Normalizes absence-of-relation representations to null:
 * - null, undefined, false, "" → null
 * - "null", "undefined" → null
 * - { id: "" | null | undefined | false } → null
 * - {} (no id field) → null
 *
 * The preprocessor always returns null for invalid inputs.
 * Whether null is accepted is decided by the consuming schema (.nullable()).
 */

export function objectIdPreprocess(value: unknown): unknown {
  if (
    value === null ||
    value === undefined ||
    value === false ||
    value === "" ||
    value === "null" ||
    value === "undefined"
  ) {
    return null;
  }

  if (isPlainObject(value)) {
    if (!("id" in value)) return null;
    if (value.id === "" || value.id === null || value.id === undefined || value.id === false)
      return null;
  }

  return value;
}
