import {
  CidadeFindOneInput,
  CidadeFindOneOutput,
  CidadeListInput,
  CidadeListOutput,
} from "@/core/cidade";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Token de injeção para o repositório de Cidade
 */
export const CIDADE_REPOSITORY_PORT = Symbol("ICidadeRepositoryPort");

/**
 * Port de saída para operações de persistência de Cidade
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface ICidadeRepositoryPort {
  /**
   * Lista cidades com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @returns Lista paginada de cidades
   */
  findAll(accessContext: AccessContext, dto: CidadeListInput | null): Promise<CidadeListOutput>;

  /**
   * Busca uma cidade por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com ID da cidade
   * @returns Cidade encontrada ou null
   */
  findById(
    accessContext: AccessContext,
    dto: CidadeFindOneInput,
  ): Promise<CidadeFindOneOutput | null>;
}
