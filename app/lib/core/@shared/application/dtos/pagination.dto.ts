import type { IPaginationMeta, IPaginationResult } from "../pagination";

/**
 * DTO genérico para entrada de paginação
 * Não depende de tipagens externas (framework-agnostic)
 */
export class PaginationInput {
  page?: number | null | undefined;
  limit?: number | null | undefined;
  search?: string | null | undefined;
  sortBy?: string[] | null | undefined;
  selection?: string[] | null | undefined;
}

export type IFilterAcceptableValues = string | string[] | number | number[] | null | undefined;

/**
 * DTO genérico para metadados de paginação
 * Implementa IPaginationMeta do core
 */
export class PaginationMeta implements IPaginationMeta {
  currentPage!: number;
  totalPages!: number;
  itemsPerPage!: number;
  totalItems!: number;
  sortBy!: [string, string][];
  filter!: Record<string, string | string[]>;
  search!: string;
}

/**
 * DTO genérico para resultado paginado
 * Implementa IPaginationResult do core
 */
export class PaginationResult<T> implements IPaginationResult<T> {
  meta!: PaginationMeta;
  data!: T[];
}
