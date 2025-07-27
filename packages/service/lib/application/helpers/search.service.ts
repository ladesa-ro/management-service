import { Injectable } from "@nestjs/common";
import { PaginateConfig, paginate } from "nestjs-paginate";
import { PaginateQuery } from "nestjs-paginate/lib/decorator";
import { type SelectQueryBuilder } from "typeorm";
import { paginateConfig } from "@/infrastructure/fixtures";

type SearchOptions = {
  limit?: number | null;
  page?: number | null;
  search?: null | string;

  sortBy?: string[];

  [`filter.${string}`]?: string[] | string;
};

@Injectable()
export class SearchService {
  public search(repositoryQb: SelectQueryBuilder<any>, options: SearchOptions, config: PaginateConfig<T>) {
    const paginateQuery: PaginateQuery = {
      limit: options.limit,
      page: options.page,
      search: options.search,

      sortBy: options.sortBy?.map((i) => i.split(":")),

      path: "#",

      filter: {},
    };

    for (const [key, value] of Object.entries(options)) {
      const prefix = "filter.";

      if (key.startsWith(prefix)) {
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
