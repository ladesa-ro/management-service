/**
 * Operadores de filtro suportados
 */
export type FilterOperator =
  | "$eq"
  | "$ne"
  | "$gt"
  | "$gte"
  | "$lt"
  | "$lte"
  | "$in"
  | "$nin"
  | "$like"
  | "$ilike"
  | "$null"
  | "$notnull"
  | "$between"
  | "$or"
  | "$and"
  | "$not";

/**
 * Configuração de paginação para um recurso (framework-agnostic)
 */
export interface IPaginationConfig {
  /** Campos a serem selecionados na consulta */
  select?: string[];

  /** Colunas que podem ser usadas para ordenação */
  sortableColumns?: string[];

  /** Colunas que podem ser pesquisadas com busca textual */
  searchableColumns?: string[];

  /** Ordenação padrão no formato [campo, direção][] */
  defaultSortBy?: [string, string][];

  /** Colunas que podem ser filtradas e seus operadores permitidos */
  filterableColumns?: Record<string, (FilterOperator | string)[] | true>;

  /** Limite máximo de itens por página */
  maxLimit?: number;

  /** Limite padrão de itens por página */
  defaultLimit?: number;
}
