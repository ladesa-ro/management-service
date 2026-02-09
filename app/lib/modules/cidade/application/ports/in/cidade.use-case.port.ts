import type { AccessContext } from "@/modules/@core/access-context";
import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de Cidade
 * Define o contrato que o service deve implementar
 */
export interface ICidadeUseCasePort {
  /**
   * Lista cidades com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @returns Lista paginada de cidades
   */
  findAll(
    accessContext: AccessContext,
    dto: CidadeListInputDto | null,
  ): Promise<CidadeListOutputDto>;

  /**
   * Busca uma cidade por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da cidade
   * @returns Cidade encontrada ou null
   */
  findById(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
  ): Promise<CidadeFindOneOutputDto | null>;

  /**
   * Busca uma cidade por ID (lança exceção se não encontrado)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da cidade
   * @returns Cidade encontrada
   */
  findByIdStrict(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
  ): Promise<CidadeFindOneOutputDto>;
}
