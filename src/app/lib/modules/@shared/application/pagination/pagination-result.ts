/**
 * Metadados de paginação
 */
export interface IPaginationMeta {
  /** Itens por página */
  itemsPerPage: number;

  /** Total de itens */
  totalItems: number;

  /** Página atual (1-indexed) */
  currentPage: number;

  /** Total de páginas */
  totalPages: number;

  /** Ordenação aplicada */
  sortBy?: [string, string][];

  /** Colunas usadas na busca */
  searchBy?: string[];

  /** Termo de busca aplicado */
  search?: string;

  /** Filtros aplicados */
  filter?: Record<string, string | string[]>;
}

/**
 * Links de navegação para paginação (HATEOAS)
 */
export interface IPaginationLinks {
  first?: string;
  previous?: string;
  current: string;
  next?: string;
  last?: string;
}

/**
 * Resultado de uma consulta paginada
 */
export interface IPaginationResult<T> {
  data: T[];
  meta: IPaginationMeta;
  links?: IPaginationLinks;
}
