import { Injectable } from "@nestjs/common";
import { PaginateConfig, paginate } from "nestjs-paginate";
import { PaginateQuery } from "nestjs-paginate/lib/decorator";
import { type SelectQueryBuilder } from "typeorm";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";
import { paginateConfig } from "@/infrastructure/fixtures";

type SearchOptions = {
  limit?: number | null;
  page?: number | null;
  search?: null | string;

  sortBy?: string[];
} & {
  [key in `filter.${string}`]?: string[] | string;
};

@Injectable()
export class SearchService {
  public search<T extends ObjectLiteral>(repositoryQb: SelectQueryBuilder<T>, options: SearchOptions | null, config: PaginateConfig<T>) {
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

        paginateQuery.filter = {
          ...paginateQuery.filter,
          [key.replace(prefix, "")]: value,
        };
      }
    }

    return paginate(paginateQuery, repositoryQb.clone(), {
      ...paginateConfig,
      ...config,
    });
  }
}
