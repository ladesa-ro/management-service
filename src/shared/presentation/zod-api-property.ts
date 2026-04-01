import type { z } from "zod";

interface ZodExtractedOptions {
  [key: string]: unknown;
  type?: string;
  description?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  format?: string;
  nullable?: boolean;
  required?: boolean | string[];
  isArray?: boolean;
  example?: unknown;
  enum?: unknown[];
  pattern?: string;
  default?: unknown;
  properties?: Record<string, unknown>;
}

/**
 * Maps JSON Schema types to Swagger/OpenAPI type strings.
 * Handles "integer" specially since OpenAPI uses it.
 */
function mapJsonSchemaType(jsonType: unknown): string | undefined {
  if (typeof jsonType === "string") {
    return jsonType;
  }

  if (Array.isArray(jsonType)) {
    const nonNull = jsonType.filter((t: string) => t !== "null");
    return nonNull.length === 1 ? (nonNull[0] as string) : undefined;
  }

  return undefined;
}

/**
 * Attempts to extract API property metadata using `toJSONSchema()`.
 */
function extractViaJsonSchema(schema: z.ZodType): ZodExtractedOptions {
  try {
    const jsonSchema = (
      schema as unknown as { toJSONSchema(): Record<string, unknown> }
    ).toJSONSchema();
    const result: ZodExtractedOptions = {};

    // Type
    const schemaType = mapJsonSchemaType(jsonSchema.type);
    if (schemaType) {
      result.type = schemaType;
    }

    // String constraints
    if (typeof jsonSchema.minLength === "number") result.minLength = jsonSchema.minLength;
    if (typeof jsonSchema.maxLength === "number") result.maxLength = jsonSchema.maxLength;

    // Number constraints
    if (typeof jsonSchema.minimum === "number") result.minimum = jsonSchema.minimum;
    if (typeof jsonSchema.maximum === "number") result.maximum = jsonSchema.maximum;

    // Format (uuid, email, etc.)
    if (typeof jsonSchema.format === "string") result.format = jsonSchema.format;

    // Pattern
    if (typeof jsonSchema.pattern === "string") result.pattern = jsonSchema.pattern;

    // Description
    if (typeof jsonSchema.description === "string") result.description = jsonSchema.description;

    // Enum
    if (Array.isArray(jsonSchema.enum)) result.enum = jsonSchema.enum;

    // Default
    if (jsonSchema.default !== undefined) result.default = jsonSchema.default;

    // Object handling: extract properties and required from z.object() schemas
    if (schemaType === "object" && jsonSchema.properties) {
      result.properties = jsonSchema.properties as Record<string, unknown>;
      if (Array.isArray(jsonSchema.required)) {
        result.required = jsonSchema.required as string[];
      }
    }

    // Array handling
    if (schemaType === "array" && jsonSchema.items) {
      result.isArray = true;
      const itemType = mapJsonSchemaType((jsonSchema.items as Record<string, unknown>).type);
      if (itemType) result.type = itemType;
    }

    // Nullable (anyOf with null)
    if (Array.isArray(jsonSchema.anyOf)) {
      const types = jsonSchema.anyOf as Array<Record<string, unknown>>;
      const hasNull = types.some((t) => t.type === "null");
      if (hasNull) {
        result.nullable = true;
        const nonNull = types.find((t) => t.type !== "null");
        if (nonNull) {
          const innerType = mapJsonSchemaType(nonNull.type);
          if (innerType) result.type = innerType;
          if (typeof nonNull.minLength === "number") result.minLength = nonNull.minLength;
          if (typeof nonNull.maxLength === "number") result.maxLength = nonNull.maxLength;
          if (typeof nonNull.minimum === "number") result.minimum = nonNull.minimum;
          if (typeof nonNull.maximum === "number") result.maximum = nonNull.maximum;
          if (typeof nonNull.format === "string") result.format = nonNull.format;
          if (typeof nonNull.pattern === "string") result.pattern = nonNull.pattern;
          if (Array.isArray(nonNull.enum)) result.enum = nonNull.enum;
        }
      }
    }

    return result;
  } catch {
    return {};
  }
}

/**
 * Fallback: extract metadata by inspecting Zod schema properties directly.
 * Used when `toJSONSchema()` fails (e.g., `z.date()`).
 */
function extractViaInspection(schema: z.ZodType): ZodExtractedOptions {
  const result: ZodExtractedOptions = {};
  const s = schema as unknown as Record<string, unknown>;

  // Type
  if (typeof s.type === "string") {
    result.type = s.type;
  }

  // Handle wrapper types
  if (s.type === "nullable" || s.type === "optional") {
    if (s.type === "nullable") result.nullable = true;

    const def = s.def as Record<string, unknown> | undefined;
    const inner = def?.innerType as Record<string, unknown> | undefined;
    if (inner) {
      const innerType = inner.type as string | undefined;
      if (innerType) result.type = innerType;
      if (typeof inner.minLength === "number") result.minLength = inner.minLength;
      if (typeof inner.maxLength === "number") result.maxLength = inner.maxLength;
      if (typeof inner.format === "string") result.format = inner.format;
      if (typeof (inner as Record<string, unknown>).minValue === "number")
        result.minimum = (inner as Record<string, unknown>).minValue as number;
      if (typeof (inner as Record<string, unknown>).maxValue === "number")
        result.maximum = (inner as Record<string, unknown>).maxValue as number;
    }
  } else {
    // Direct properties on the schema
    if (typeof s.minLength === "number") result.minLength = s.minLength;
    if (typeof s.maxLength === "number") result.maxLength = s.maxLength;
    if (typeof s.minValue === "number") result.minimum = s.minValue;
    if (typeof s.maxValue === "number") result.maximum = s.maxValue;
    if (typeof s.format === "string") result.format = s.format;
  }

  // Description
  if (typeof s.description === "string") result.description = s.description;

  // Enum entries
  const def = s.def as Record<string, unknown> | undefined;
  if (def?.type === "enum" && def.entries) {
    result.enum = Object.values(def.entries as Record<string, unknown>);
  }

  // Array
  if (s.type === "array") {
    result.isArray = true;
    const element = (def as Record<string, unknown> | undefined)?.element as
      | Record<string, unknown>
      | undefined;
    if (element?.type) {
      result.type = element.type as string;
    }
  }

  return result;
}

/**
 * Extracts metadata from a Zod schema and returns an object compatible
 * with `@ApiProperty()` options from `@nestjs/swagger`.
 *
 * Uses `toJSONSchema()` when available (Zod v4), with a fallback to
 * direct property inspection for schemas that don't support JSON Schema
 * conversion (e.g., `z.date()`).
 *
 * @param schema - A Zod schema to extract metadata from.
 * @param overrides - Optional overrides that take precedence over extracted values.
 * @returns An object suitable for spreading into `@ApiProperty()`.
 *
 * @example
 * ```ts
 * @ApiProperty(zodApiProperty(estadoNomeSchema, { description: "Nome oficial do estado" }))
 * nome: string;
 * ```
 */

export function zodApiProperty(
  schema: z.ZodType,
  overrides?: Record<string, unknown>,
): Record<string, unknown> {
  let extracted = extractViaJsonSchema(schema);

  // If toJSONSchema yielded nothing useful, try direct inspection
  if (!extracted.type) {
    extracted = { ...extracted, ...extractViaInspection(schema) };
  }

  // Clean up: remove undefined/null values
  const cleaned: ZodExtractedOptions = {};
  for (const [key, value] of Object.entries(extracted)) {
    if (value !== undefined && value !== null) {
      (cleaned as Record<string, unknown>)[key] = value;
    }
  }

  // Apply overrides (always win)
  if (overrides) {
    return { ...cleaned, ...overrides };
  }

  return cleaned;
}
