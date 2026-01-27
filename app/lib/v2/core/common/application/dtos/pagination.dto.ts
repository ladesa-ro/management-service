/**
 * DTO genérico para entrada de paginação
 * Não depende de tipagens externas (framework-agnostic)
 */
export class PaginationInput {
  // Index signature for filter properties (compatible with SearchOptions)
  [key: string]: string | string[] | number | number[] | null | undefined;

  page?: number;

  limit?: number;

  search?: string;

  sortBy?: string[];
}

/**
 * DTO genérico para metadados de paginação
 */
export class PaginationMeta {
  itemsPerPage!: number;
  totalItems!: number;
  currentPage!: number;
  totalPages!: number;
  sortBy!: Array<[string, string]>;
  search?: string;
  searchBy?: string[];
  filter?: Record<string, string | string[]>;
}

/**
 * DTO genérico para resultado paginado
 */
export class PaginationResult<T> {
  meta!: PaginationMeta;
  data!: T[];
}
