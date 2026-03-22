import type { IPaginationMeta } from "@/application/pagination";

/**
 * Metadados de paginação
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
