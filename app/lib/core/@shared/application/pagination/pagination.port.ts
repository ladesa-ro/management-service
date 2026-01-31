import type { IPaginationConfig } from "./pagination-config";
import type { IPaginationCriteria } from "./pagination-criteria";
import type { IPaginationResult } from "./pagination-result";

/**
 * Port de saída para operações de paginação (framework-agnostic)
 *
 * Esta interface define o contrato para adapters de paginação.
 * Implementações específicas (TypeORM, Prisma, etc.) devem
 * estender esta interface com seus tipos específicos.
 */
export interface IPaginationPort<TQueryBuilder = unknown> {
  /**
   * Realiza uma busca paginada
   *
   * @template T - Tipo da entidade sendo paginada
   * @param queryBuilder - Query builder da fonte de dados
   * @param criteria - Critérios de paginação (filtros, ordenação, etc)
   * @param config - Configuração da paginação para o recurso
   * @returns Resultado paginado com dados e metadados
   */
  paginate<T>(
    queryBuilder: TQueryBuilder,
    criteria: IPaginationCriteria | null,
    config: IPaginationConfig,
  ): Promise<IPaginationResult<T>>;
}
