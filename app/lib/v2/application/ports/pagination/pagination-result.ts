/**
 * Metadados de paginação
 */
export interface IPaginationMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy?: [string, string][];
  searchBy?: string[];
  search?: string;
  filter?: Record<string, string | string[]>;
}

/**
 * Resultado de uma consulta paginada
 */
export interface IPaginationResult<T> {
  data: T[];
  meta: IPaginationMeta;
  links?: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}
