import type { AccessContext } from "@/server/access-context";

/**
 * Interface para operações de listagem em repositórios
 *
 * @template ListOutputDto - Tipo do DTO de saída para listagem (paginado)
 */
export interface IListRepository<ListOutputDto> {
  /**
   * Lista entidades com paginação e filtros
   */
  findAll(
    accessContext: AccessContext | null,
    dto: unknown,
    selection?: string[] | boolean | null,
  ): Promise<ListOutputDto>;
}
