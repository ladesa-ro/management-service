import type { IPaginationConfig } from "./pagination-config";
import type { IPaginationCriteria } from "./pagination-criteria";
import type { IPaginationResult } from "./pagination-result";

/**
 * Port de saída para operações de paginação (framework-agnostic).
 *
 * @template TQueryBuilder - Tipo do query builder da fonte de dados
 */
export interface IPaginationPort<TQueryBuilder = unknown> {
  paginate<T>(
    queryBuilder: TQueryBuilder,
    criteria: IPaginationCriteria | null,
    config: IPaginationConfig,
  ): Promise<IPaginationResult<T>>;
}
