import { Injectable } from "@nestjs/common";
import { type PaginateConfig, paginate } from "nestjs-paginate";
import type { PaginateQuery } from "nestjs-paginate/lib/decorator";
import type { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import type {
  IPaginationConfig,
  IPaginationCriteria,
  IPaginationPort,
  IPaginationResult,
} from "@/v2/application/ports/pagination";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";

/**
 * Adapter que implementa IPaginationPort usando nestjs-paginate
 * Encapsula toda a lógica do nestjs-paginate, mantendo o domínio limpo
 */
@Injectable()
export class NestJsPaginateAdapter implements IPaginationPort {
  async paginate<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    criteria: IPaginationCriteria | null,
    config: IPaginationConfig<T>,
  ): Promise<IPaginationResult<T>> {
    // Converte IPaginationCriteria para PaginateQuery do nestjs-paginate
    const paginateQuery: PaginateQuery = this.buildPaginateQuery(criteria);

    // Converte IPaginationConfig para PaginateConfig do nestjs-paginate
    const paginateConfigMerged: PaginateConfig<T> = {
      ...paginateConfig,
      ...config,
    };

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

    // Processa filtros
    if (criteria?.filters) {
      for (const [key, value] of Object.entries(criteria.filters)) {
        if (typeof value !== "string" && !Array.isArray(value)) {
          continue;
        }

        paginateQuery.filter = {
          ...paginateQuery.filter,
          [key]: value,
        };
      }
    }

    return paginateQuery;
  }
}
