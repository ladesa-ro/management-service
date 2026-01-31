import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Interface para operações de listagem em repositórios
 *
 * @template ListOutputDto - Tipo do DTO de saída para listagem (paginado)
 */
export interface IListRepositoryPort<ListOutputDto> {
  /**
   * Lista entidades com paginação e filtros
   */
  findAll(
    accessContext: AccessContext,
    dto: unknown,
    selection?: string[] | boolean,
  ): Promise<ListOutputDto>;
}
