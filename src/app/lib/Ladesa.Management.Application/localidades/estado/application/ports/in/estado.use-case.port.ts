import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { EstadoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoFindOneInputDto";
import { EstadoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoFindOneOutputDto";
import { EstadoListInputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoListInputDto";
import { EstadoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoListOutputDto";

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
  findAll(
    accessContext: AccessContext,
    dto: EstadoListInputDto | null,
  ): Promise<EstadoListOutputDto>;

  /**
   * Busca um estado por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do estado
   * @returns Estado encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: EstadoFindOneInputDto,
  ): Promise<EstadoFindOneOutputDto | null>;

  /**
   * Busca um estado por ID (lança exceção se não encontrado)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID do estado
   * @returns Estado encontrado
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: EstadoFindOneInputDto,
  ): Promise<EstadoFindOneOutputDto>;
}
