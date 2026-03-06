import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";

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
