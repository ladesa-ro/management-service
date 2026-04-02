import { type PaginateConfig, paginate } from "nestjs-paginate";
import type { PaginateQuery } from "nestjs-paginate/lib/decorator";
import type { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import type {
  IPaginationConfig,
  IPaginationCriteria,
  IPaginationPort,
  IPaginationResult,
} from "@/application/pagination";
import { Impl } from "@/domain/dependency-injection";

@Impl()
export class NestJsPaginateAdapter implements IPaginationPort<SelectQueryBuilder<ObjectLiteral>> {
  async paginate<T>(
    queryBuilder: SelectQueryBuilder<ObjectLiteral>,
    criteria: IPaginationCriteria | null,
    config: IPaginationConfig,
  ): Promise<IPaginationResult<T>> {
    const paginateQuery: PaginateQuery = this.buildPaginateQuery(criteria);

    const result = await paginate(
      paginateQuery,
      queryBuilder.clone(),
      config as PaginateConfig<ObjectLiteral>,
    );

    return result as unknown as IPaginationResult<T>;
  }

  /**
   * Converte critérios genéricos para o formato do nestjs-paginate
   */
  private buildPaginateQuery(criteria: IPaginationCriteria | null): PaginateQuery {
    const paginateQuery: PaginateQuery = {
      limit: criteria?.limit ?? undefined,
      page: criteria?.page ?? undefined,
      search: criteria?.search ?? undefined,
      sortBy: criteria?.sortBy?.map((i) => i.split(":") as [string, string]),
      path: "#",
      filter: {},
    };

    // Processa filtros, removendo valores vazios que causariam erros no banco
    if (criteria?.filters) {
      for (const [key, value] of Object.entries(criteria.filters)) {
        if (typeof value !== "string" && !Array.isArray(value)) {
          continue;
        }

        const sanitized = this.sanitizeFilterValue(value);

        if (sanitized === undefined) {
          continue;
        }

        paginateQuery.filter = {
          ...paginateQuery.filter,
          [key]: sanitized,
        };
      }
    }

    return paginateQuery;
  }

  /**
   * Remove strings vazias de valores de filtro.
   * Query params como `filter.campus.id=` enviam string vazia,
   * que causa "invalid input syntax for type uuid" no PostgreSQL.
   */
  private sanitizeFilterValue(value: string | string[]): string | string[] | undefined {
    if (typeof value === "string") {
      return value.trim() === "" ? undefined : value;
    }

    const filtered = value.filter((item) => item.trim() !== "");
    return filtered.length > 0 ? filtered : undefined;
  }
}
