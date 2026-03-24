import { type PaginateConfig, paginate } from "nestjs-paginate";
import type { PaginateQuery } from "nestjs-paginate/lib/decorator";
import type { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import type { IPaginationCriteria, IPaginationResult } from "@/application/pagination";
import { DeclareImplementation } from "@/domain/dependency-injection";
import { paginateConfig } from "../config/paginate-config";
import type { ITypeOrmPaginationConfig } from "../interfaces/pagination-config.types";

/**
 * Adapter que implementa paginação usando nestjs-paginate
 * Encapsula toda a lógica do nestjs-paginate, mantendo o domínio limpo
 */

@DeclareImplementation()
export class NestJsPaginateAdapter {
  async paginate<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    criteria: IPaginationCriteria | null,
    config: ITypeOrmPaginationConfig<T>,
  ): Promise<IPaginationResult<T>> {
    // Converte IPaginationCriteria para PaginateQuery do nestjs-paginate
    const paginateQuery: PaginateQuery = this.buildPaginateQuery(criteria);

    // Converte IPaginationConfig para PaginateConfig do nestjs-paginate
    // Cast needed because paginateConfig base defaults are spread with entity-specific config
    const paginateConfigMerged = {
      ...paginateConfig,
      ...config,
    } as PaginateConfig<T>;

    // Executa a paginação usando nestjs-paginate
    const result = await paginate(paginateQuery, queryBuilder.clone(), paginateConfigMerged);

    // Retorna no formato esperado pelo port (já é compatível)
    return result as IPaginationResult<T>;
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
