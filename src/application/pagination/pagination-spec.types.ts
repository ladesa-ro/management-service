import type { FilterOperator, IPaginationConfig } from "./pagination-config";

export type PaginationSortDirection = "ASC" | "DESC";

/**
 * Especificação de paginação de um módulo — versão estrita de IPaginationConfig
 * com campos obrigatórios e sem opções de infraestrutura (select, limits).
 * Relations ficam na camada de infraestrutura (conceito ORM).
 */
export type IPaginationSpec = Required<
  Pick<IPaginationConfig, "sortableColumns" | "searchableColumns">
> & {
  defaultSortBy: [string, PaginationSortDirection][];
  filterableColumns: Record<string, (FilterOperator | string)[]>;
};
