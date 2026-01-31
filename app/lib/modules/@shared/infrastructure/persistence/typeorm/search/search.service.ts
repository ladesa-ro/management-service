import { Injectable } from "@nestjs/common";
import { type PaginateConfig, paginate } from "nestjs-paginate";
import type { PaginateQuery } from "nestjs-paginate/lib/decorator";
import type { SelectQueryBuilder } from "typeorm";
import type { ObjectLiteral } from "typeorm/common/ObjectLiteral";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";

/**
 * @deprecated Use NestJsPaginateAdapter instead
 */
export type SearchOptions = {
  limit?: number | null;
  page?: number | null;
  search?: null | string;
  sortBy?: string[];
  [key: string]: string | string[] | number | number[] | null | undefined;
};

/**
 * @deprecated Use NestJsPaginateAdapter instead. This service is kept for legacy compatibility.
 */
@Injectable()
export class SearchService {
  public search<T extends ObjectLiteral>(
    repositoryQb: SelectQueryBuilder<T>,
    options: SearchOptions | null,
    config: PaginateConfig<T>,
  ) {
    const paginateQuery: PaginateQuery = {
      limit: options?.limit ?? undefined,
      page: options?.page ?? undefined,
      search: options?.search ?? undefined,
      sortBy: options?.sortBy?.map((i) => i.split(":") as [string, string]),
      path: "#",
      filter: {},
    };

    for (const [key, value] of Object.entries(options ?? {})) {
      const prefix = "filter.";

      if (key.startsWith(prefix)) {
        if (typeof value !== "string" && !Array.isArray(value)) {
          continue;
        }

        const filterValue = Array.isArray(value) ? value.map((v) => String(v)) : value;

        paginateQuery.filter = {
          ...paginateQuery.filter,
          [key.replace(prefix, "")]: filterValue,
        };
      }
    }

    return paginate(paginateQuery, repositoryQb.clone(), {
      ...paginateConfig,
      ...config,
    });
  }
}
