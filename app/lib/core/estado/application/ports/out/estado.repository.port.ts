import {
  EstadoFindOneInput,
  EstadoFindOneOutput,
  EstadoListInput,
  EstadoListOutput,
} from "@/core/estado";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Port de saída para operações de persistência de Estado
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IEstadoRepositoryPort {
  /**
   * Lista estados com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @returns Lista paginada de estados
   */
  findAll(accessContext: AccessContext, dto: EstadoListInput | null): Promise<EstadoListOutput>;

  /**
   * Busca um estado por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do estado
   * @returns Estado encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: EstadoFindOneInput,
  ): Promise<EstadoFindOneOutput | null>;
}
