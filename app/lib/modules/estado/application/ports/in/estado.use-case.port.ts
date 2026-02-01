import type { AccessContext } from "@/modules/@core/access-context";
import {
  EstadoFindOneInput,
  EstadoFindOneOutput,
  EstadoListInput,
  EstadoListOutput,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de Estado
 * Define o contrato que o service deve implementar
 */
export interface IEstadoUseCasePort {
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

  /**
   * Busca um estado por ID (lança exceção se não encontrado)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do estado
   * @returns Estado encontrado
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: EstadoFindOneInput,
  ): Promise<EstadoFindOneOutput>;
}
