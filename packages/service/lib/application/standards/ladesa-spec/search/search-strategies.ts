import * as LadesaTypings from "@ladesa-ro/especificacao";
import { castArray } from "lodash";
import { Paginated } from "nestjs-paginate";

export type LadesaPaginatedResult<T> = {
  data: T[];
  links: LadesaTypings.PaginationResultLinks;
  meta: LadesaTypings.PaginationResultMeta;
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
