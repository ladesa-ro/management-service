/**
 * Utilitários de mapping para tradução entre Entity TypeORM ↔ Domain ↔ Query Result.
 *
 * Funções puras e composáveis, sem conhecimento de nenhum módulo específico.
 * Usadas tanto pelo helper de mapeamento simples (camada 2) quanto
 * pelos mappers imperativos de módulos complexos (camada 3).
 */

/** Filtra itens ativos (dateDeleted === null) de uma coleção. */
export function filterActive<T extends { dateDeleted: Date | null }>(
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

/** Converte Date do TypeORM para ISO string do domínio. */
export function dateToISO(date: Date): string {
  return date.toISOString();
}

/** Converte ISO string do domínio para Date do TypeORM. */
export function isoToDate(iso: string): Date {
  return new Date(iso);
}

/** Converte Date | null para string | null. */
export function dateToISONullable(date: Date | null): string | null {
  return date ? date.toISOString() : null;
}

/** Converte string | null para Date | null. */
export function isoToDateNullable(iso: string | null): Date | null {
  return iso ? new Date(iso) : null;
}

/**
 * Converte campos de data de uma entity TypeORM (Date) para formato query result (string).
 * Útil para mapear relações carregadas sem cast manual.
 */
export function mapDatedEntity<
  T extends { dateCreated: Date; dateUpdated: Date; dateDeleted: Date | null },
>(
  entity: T,
): Omit<T, "dateCreated" | "dateUpdated" | "dateDeleted"> & {
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
} {
  return {
    ...entity,
    dateCreated: entity.dateCreated.toISOString(),
    dateUpdated: entity.dateUpdated.toISOString(),
    dateDeleted: entity.dateDeleted?.toISOString() ?? null,
  };
}
