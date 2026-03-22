/**
 * Default pagination configuration for TypeORM repositories.
 * Used by nestjs-paginate adapter.
 */
/**
 * Default pagination configuration for TypeORM repositories.
 * Used by nestjs-paginate adapter.
 *
 * NOTE: Typed as IPaginationConfig with extra nestjs-paginate fields.
 * The spread into PaginateConfig<T> handles type widening at the call site.
 */
import type { IPaginationConfig } from "@/application/pagination";

interface IDefaultPaginateConfig extends IPaginationConfig {
  withDeleted: boolean;
  relativePath: boolean;
  origin: string;
  multiWordSearch: boolean;
}

export const paginateConfig: IDefaultPaginateConfig = {
  /**
   * Required: true (must have a minimum of one column)
   * Type: (keyof Entity)[]
   * Description: These are the columns that are valid to be sorted by.
   */
  sortableColumns: ["id"],

  /**
   * Required: false
   * Type: [keyof Entity, 'ASC' | 'DESC'][]
   * Default: [[sortableColumns[0], 'ASC]]
   * Description: The order to display the sorted entities.
   */
  defaultSortBy: [],

  /**
   * Required: false
   * Type: number
   * Default: 100
   * Description: The maximum amount of entities to return per page.
   * Set it to 0, in conjunction with limit=0 on query param, to disable pagination.
   */
  maxLimit: 100,

  /**
   * Required: false
   * Type: number
   * Default: 20
   */
  defaultLimit: 20,

  /**
   * Required: false
   * Type: boolean
   * Description: Disables the global condition of "non-deleted" for the entity with delete date columns.
   * https://typeorm.io/select-query-builder#querying-deleted-rows
   */
  withDeleted: false,

  /**
   * Required: false
   * Type: boolean
   * Default: false
   * Description: Generate relative paths in the resource links.
   */
  relativePath: true,

  /**
   * Required: false
   * Type: string
   * Description: Overrides the origin of absolute resource links if set.
   */
  origin: "",

  multiWordSearch: true,
};
