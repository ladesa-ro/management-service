type TransformFn = (value: unknown) => unknown;

// ============================================================================
// Date ↔ ISO string (timestamptz)
// ============================================================================

export const dateToISO: TransformFn = (v) =>
  v instanceof Date ? v.toISOString() : (v as string | null);

export const isoToDate: TransformFn = (v) =>
  typeof v === "string" ? new Date(v) : (v as Date | null);

// ============================================================================
// Date ↔ date-only string (YYYY-MM-DD)
// ============================================================================

export const dateToDateString: TransformFn = (v) =>
  v instanceof Date ? v.toISOString().split("T")[0] : (v as string | null);

export const dateStringToDate: TransformFn = (v) =>
  typeof v === "string" ? new Date(`${v}T00:00:00.000Z`) : (v as Date | null);

// ============================================================================
// Relation → string ID / { id } normalization
// ============================================================================

/** Extrai o ID de uma relação carregada: { id, ... } → "id-string" */
export const extractRelationId: TransformFn = (v) => (v as { id?: string } | null)?.id ?? null;

/** Empacota um ID string em referência de relação: "id-string" → { id: "id-string" } */
export const wrapRelationId: TransformFn = (v) =>
  typeof v === "string" ? { id: v } : (v as { id: string });

/** Normaliza relação carregada para { id }: { id, nome, ... } → { id } */
export const normalizeRelationRef: TransformFn = (v) => {
  const id = (v as { id?: string | number } | null)?.id;
  return id != null ? { id } : null;
};
