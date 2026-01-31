import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Interface para operações de busca por ID em repositórios
 *
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 */
export interface IFindOneRepositoryPort<FindOneOutputDto> {
  /**
   * Busca uma entidade por ID
   * @returns A entidade ou null se não encontrada
   */
  findById(
    accessContext: AccessContext | null,
    dto: { id: string | number },
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null>;

  /**
   * Busca simplificada por ID (opcional)
   */
  findByIdSimple?(
    accessContext: AccessContext,
    id: string | number,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null>;
}
