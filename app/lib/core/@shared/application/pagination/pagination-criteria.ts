/**
 * Critérios de paginação genéricos (framework-agnostic)
 * Usado para passar parâmetros de paginação entre camadas
 */
export interface IPaginationCriteria {
  /** Número da página (1-indexed) */
  page?: number | null;

  /** Limite de itens por página */
  limit?: number | null;

  /** Termo de busca textual */
  search?: string | null;

  /** Ordenação no formato ["campo:ASC", "campo:DESC"] */
  sortBy?: string[];

  /** Filtros no formato { campo: valor | valores } */
  filters?: Record<string, string | string[]>;
}
