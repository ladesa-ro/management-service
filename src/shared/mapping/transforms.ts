/**
 * @deprecated TransformFn é usada pelo sistema legado de mappers (field-mapper, entity-domain-mapper).
 * Para novos mappers, use as funções tipadas abaixo.
 */
type TransformFn = (value: unknown) => unknown;

// ============================================================================
// @deprecated — Transforms legadas (unknown → unknown)
// Mantidas para compatibilidade com módulos não migrados.
// ============================================================================

/** @deprecated Use `dateToISOString` */

export const dateToISO: TransformFn = (v) =>
  v instanceof Date ? v.toISOString() : (v as string | null);

/** @deprecated Use `isoStringToDate` */

export const isoToDate: TransformFn = (v) =>
  typeof v === "string" ? new Date(v) : (v as Date | null);

/** @deprecated Use `dateToDateOnlyString` */

export const dateToDateString: TransformFn = (v) =>
  v instanceof Date ? v.toISOString().split("T")[0] : (v as string | null);

/** @deprecated Use `dateOnlyStringToDate` */

export const dateStringToDate: TransformFn = (v) =>
  typeof v === "string" ? new Date(`${v}T00:00:00.000Z`) : (v as Date | null);

/** @deprecated */

export const extractRelationId: TransformFn = (v) => (v as { id?: string } | null)?.id ?? null;

/** @deprecated */

export const wrapRelationId: TransformFn = (v) =>
  typeof v === "string" ? { id: v } : (v as { id: string });

/** @deprecated Use `pickId` */

export const normalizeRelationRef: TransformFn = (v) => {
  const id = (v as { id?: string | number } | null)?.id;
  return id != null ? { id } : null;
};

// ============================================================================
// Transforms tipadas (novo padrão)
// ============================================================================

/** Date → ISO string. Aceita null. */

export function dateToISOString(v: Date): string;

export function dateToISOString(v: Date | null): string | null;

export function dateToISOString(v: Date | null): string | null {
  return v instanceof Date ? v.toISOString() : null;
}

/** ISO string → Date. Aceita null. */

export function isoStringToDate(v: string): Date;

export function isoStringToDate(v: string | null): Date | null;

export function isoStringToDate(v: string | null): Date | null {
  return typeof v === "string" ? new Date(v) : null;
}

/** Date → "YYYY-MM-DD". Aceita null. */

export function dateToDateOnlyString(v: Date): string;

export function dateToDateOnlyString(v: Date | null): string | null;

export function dateToDateOnlyString(v: Date | null): string | null {
  return v instanceof Date ? v.toISOString().split("T")[0] : null;
}

/** "YYYY-MM-DD" → Date. Aceita null. */

export function dateOnlyStringToDate(v: string): Date;

export function dateOnlyStringToDate(v: string | null): Date | null;

export function dateOnlyStringToDate(v: string | null): Date | null {
  return typeof v === "string" ? new Date(`${v}T00:00:00.000Z`) : null;
}

/** Extrai { id } de um objeto com id. Aceita null. */

export function pickId<TId extends string | number>(v: { id: TId }): { id: TId };

export function pickId<TId extends string | number>(v: { id: TId } | null): { id: TId } | null;

export function pickId<TId extends string | number>(v: { id: TId } | null): { id: TId } | null {
  return v != null ? { id: v.id } : null;
}
