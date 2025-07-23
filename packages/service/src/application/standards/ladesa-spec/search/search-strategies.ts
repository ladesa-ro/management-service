import { GenericListInputView, PaginateQueryAdapter } from "@/application/standards/ladesa-spec/search/adapter";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { castArray } from "lodash";
import { PaginateConfig, Paginated, paginate } from "nestjs-paginate";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export type LadesaPaginatedResult<T> = {
  data: T[];
  links: LadesaTypings.PaginationResultLinks;
  meta: LadesaTypings.PaginationResultMeta;
};

export const LadesaSearch = async <T extends ObjectLiteral>(path: string, dto: GenericListInputView | null, qb: SelectQueryBuilder<T>, config: PaginateConfig<T>) => {
  const paginateQuery = PaginateQueryAdapter.FromGenericListInputView(path, dto);
  return paginate(paginateQuery, qb.clone(), config);
};

export const LadesaPaginatedResultDto = <T>(paginated: Paginated<T>): LadesaPaginatedResult<T> => {
  return {
    ...paginated,
    meta: {
      ...paginated.meta,

      sortBy: (paginated.meta.sortBy ?? [])?.map(([key, value]) => ({
        mode: value,
        property: key,
      })),

      filter: paginated.meta.filter
        ? Object.entries(paginated.meta.filter).map(([key, defs]) => ({
            property: key,
            restrictions: castArray(defs),
          }))
        : [],
    },

    links: {
      last: paginated.links.last ?? null,
      next: paginated.links.next ?? null,
      first: paginated.links.first ?? null,
      current: paginated.links.current ?? null,
      previous: paginated.links.previous ?? null,
    },
  };
};
