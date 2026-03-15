/**
 * Base para query de paginação
 */
export class PaginationQuery {
  page?: number | null | undefined;
  limit?: number | null | undefined;
  search?: string | null | undefined;
  sortBy?: string[] | null | undefined;
  selection?: string[] | boolean | null | undefined;
}

export type IFilterAcceptableValues = string | string[] | number | number[] | null | undefined;
