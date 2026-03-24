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

/**
 * Coerce para array e remove strings vazias.
 * Específico para filtros de query params, onde `filter.campo=` envia string vazia
 * que causaria erros no banco (ex: "invalid input syntax for type uuid").
 * Retorna undefined se nenhum valor válido restar.
 */
export function coerceFilterArray<T extends z.ZodType>(itemSchema: T) {
  return z.preprocess((val) => {
    if (val === undefined || val === null) return undefined;
    const arr = Array.isArray(val) ? val : [val];
    const filtered = arr.filter((item) => (typeof item === "string" ? item.trim() !== "" : true));
    return filtered.length > 0 ? filtered : undefined;
  }, z.array(itemSchema).optional());
}

export const uuidFilterSchema = coerceFilterArray(uuidSchema);
export const stringFilterSchema = coerceFilterArray(z.string());

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
});

export const graphqlPaginationInputSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).optional(),
  search: z.string().optional(),
  sortBy: z.array(z.string()).optional(),
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
