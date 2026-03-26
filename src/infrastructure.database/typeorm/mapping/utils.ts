/**
 * Utilitários de mapping para tradução entre Entity TypeORM ↔ Domain ↔ Query Result.
 *
 * Funções puras e composáveis, sem conhecimento de nenhum módulo específico.
 * Usadas tanto pelo helper de mapeamento simples (camada 2) quanto
 * pelos mappers imperativos de módulos complexos (camada 3).
 */

/** Filtra itens ativos (dateDeleted === null) de uma coleção. */

export function filterActive<T extends { dateDeleted: Date | string | null }>(
  items: T[] | undefined | null,
): T[] {
  return (items ?? []).filter((item) => item.dateDeleted === null);
}

/** Extrai { id } de uma relação carregada. Retorna null se a relação for null/undefined. */

export function toRef(relation: { id: string } | null | undefined): { id: string } | null {
  return relation ? { id: relation.id } : null;
}

/** Extrai { id } de uma relação carregada. Lança erro se a relação for null/undefined. */

export function toRefRequired(relation: { id: string } | null | undefined): { id: string } {
  if (!relation) throw new Error("Required relation is null");
  return { id: relation.id };
}

/** Converte Date ou string do TypeORM para ISO string do domínio. */

export function dateToISO(date: Date | string): string {
  return date instanceof Date ? date.toISOString() : date;
}

/** Converte ISO string do domínio para string (identity — entidades agora usam string). */

export function isoToDate(iso: string): string {
  return iso;
}

/** Converte Date | string | null para string | null. */

export function dateToISONullable(date: Date | string | null): string | null {
  return date instanceof Date ? date.toISOString() : date;
}

/** Converte string | null para string | null (identity — entidades agora usam string). */

export function isoToDateNullable(iso: string | null): string | null {
  return iso;
}

/**
 * Converte campos de data de uma entity TypeORM (Date) para formato query result (string).
 * Útil para mapear relações carregadas sem cast manual.
 */

export function mapDatedEntity<
  T extends {
    dateCreated: Date | string;
    dateUpdated: Date | string;
    dateDeleted: Date | string | null;
  },
>(
  entity: T,
): Omit<T, "dateCreated" | "dateUpdated" | "dateDeleted"> & {
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
} {
  const toISO = (v: Date | string): string => (v instanceof Date ? v.toISOString() : v);
  return {
    ...entity,
    dateCreated: toISO(entity.dateCreated),
    dateUpdated: toISO(entity.dateUpdated),
    dateDeleted: entity.dateDeleted ? toISO(entity.dateDeleted) : null,
  };
}
