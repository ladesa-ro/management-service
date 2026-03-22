import { z } from "zod";

// ============================================================================
// Scalars
// ============================================================================

export const uuidSchema = z.string().uuid();

/**
 * Coerce a single value or array to always be an array.
 * Query params come as string when single, array when multiple.
 */
export function coerceArray<T extends z.ZodType>(itemSchema: T) {
  return z.preprocess((val) => {
    if (val === undefined || val === null) return undefined;
    return Array.isArray(val) ? val : [val];
  }, z.array(itemSchema).optional());
}

export const uuidFilterSchema = coerceArray(uuidSchema);
export const stringFilterSchema = coerceArray(z.string());

// ============================================================================
// ID input schemas
// ============================================================================

export const findOneUuidInputSchema = z.object({ id: uuidSchema });
export const findOneNumericInputSchema = z.object({ id: z.coerce.number().int() });

// ============================================================================
// Pagination
// ============================================================================

export const paginationInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: coerceArray(z.string()),
  selection: coerceArray(z.string()),
});

export const graphqlPaginationInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
  selection: z.array(z.string()).optional(),
});

/**
 * Cria schema de paginação REST com filtros adicionais.
 */
export function createPaginationInputSchema(filters: Record<string, z.ZodType> = {}) {
  return paginationInputSchema.extend({
    "filter.id": stringFilterSchema,
    ...filters,
  });
}

/**
 * Cria schema de paginação GraphQL com filtros adicionais.
 */
export function createGraphqlListInputSchema(filters: Record<string, z.ZodType> = {}) {
  return graphqlPaginationInputSchema.extend({
    filterId: z.array(z.string()).optional(),
    ...filters,
  });
}

// ============================================================================
// Dated entity fields
// ============================================================================

const dateTimeStringSchema = z.preprocess(
  (val) => (val instanceof Date ? val.toISOString() : val),
  z.string(),
);

const dateTimeStringNullableSchema = z.preprocess(
  (val) => (val instanceof Date ? val.toISOString() : val),
  z.string().nullable(),
);

export const datedSchema = z.object({
  dateCreated: dateTimeStringSchema,
  dateUpdated: dateTimeStringSchema,
  dateDeleted: dateTimeStringNullableSchema,
});
