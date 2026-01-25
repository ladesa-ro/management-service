import type { FilterOperator } from "nestjs-paginate";
import type { FindOptionsRelations } from "typeorm";

/**
 * Configuração de paginação para uma entidade
 * @template T - Tipo da entidade sendo paginada
 */
export interface IPaginationConfig<T> {
  /**
   * Campos a serem selecionados na consulta
   */
  select?: string[];

  /**
   * Relações a serem carregadas (formato TypeORM FindOptionsRelations)
   */
  relations?: FindOptionsRelations<T>;

  /**
   * Colunas que podem ser usadas para ordenação
   */
  sortableColumns?: string[];

  /**
   * Colunas que podem ser pesquisadas com busca textual
   */
  searchableColumns?: string[];

  /**
   * Ordenação padrão (campo, direção)
   */
  defaultSortBy?: [string, string][];

  /**
   * Colunas que podem ser filtradas e seus operadores permitidos
   */
  filterableColumns?: {
    [key: string]: (FilterOperator | string)[] | true;
  };

  /**
   * Limite máximo de itens por página
   */
  maxLimit?: number;

  /**
   * Limite padrão de itens por página
   */
  defaultLimit?: number;
}
