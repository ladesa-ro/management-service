import type { SelectQueryBuilder } from "typeorm";
import type { IPaginationConfig } from "./pagination-config";
import type { IPaginationCriteria } from "./pagination-criteria";
import type { IPaginationResult } from "./pagination-result";

/**
 * Port de saída para operações de paginação
 * Desacopla a lógica de paginação da implementação específica (nestjs-paginate, etc)
 */
export interface IPaginationPort {
  /**
   * Realiza uma busca paginada
   * @template T - Tipo da entidade sendo paginada
   * @param queryBuilder Query builder TypeORM da fonte de dados
   * @param criteria Critérios de paginação (filtros, ordenação, etc)
   * @param config Configuração da paginação para a entidade
   * @returns Resultado paginado com dados e metadados
   */
  paginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    criteria: IPaginationCriteria | null,
    config: IPaginationConfig<T>,
  ): Promise<IPaginationResult<T>>;
}
