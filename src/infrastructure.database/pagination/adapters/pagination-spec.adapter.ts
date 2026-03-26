import type { FindOptionsRelations } from "typeorm";
import type { IPaginationSpec } from "@/application/pagination";
import { paginateConfig } from "../config/paginate-config";
import type { ITypeOrmPaginationConfig } from "../interfaces/pagination-config.types";

/**
 * Converte uma IPaginationSpec (framework-agnostic) em ITypeOrmPaginationConfig.
 * Os valores de FilterOperator são idênticos entre application e nestjs-paginate,
 * portanto não há necessidade de mapeamento — apenas composição com defaults.
 */

export function buildTypeOrmPaginateConfig<Entity>(
  spec: IPaginationSpec,
  relations?: FindOptionsRelations<Entity>,
): ITypeOrmPaginationConfig<Entity> {
  return {
    ...paginateConfig,
    sortableColumns: spec.sortableColumns,
    searchableColumns: spec.searchableColumns,
    defaultSortBy: spec.defaultSortBy,
    filterableColumns: spec.filterableColumns,
    ...(relations ? { relations } : {}),
  } as ITypeOrmPaginationConfig<Entity>;
}
