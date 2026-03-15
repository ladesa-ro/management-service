import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";

/**
 * Interface para repositórios read-only (apenas listagem e busca por ID)
 * Usada por entidades que não suportam operações de escrita (Estado, Cidade, etc.)
 *
 * @template ListInputDto - Tipo do DTO de entrada para listagem
 * @template ListOutputDto - Tipo do DTO de saída para listagem (paginado)
 * @template FindOneQuery - Tipo do DTO de entrada para busca única
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 */
export interface IReadOnlyRepository<
  ListInputDto,
  ListOutputDto,
  FindOneQuery extends { id: string | number },
  FindOneOutputDto,
> {
  /**
   * Lista entidades com paginação e filtros
   */
  findAll(accessContext: AccessContext | null, dto: ListInputDto | null): Promise<ListOutputDto>;

  /**
   * Busca uma entidade por ID
   * @returns A entidade ou null se não encontrada
   */
  findById(
    accessContext: AccessContext | null,
    dto: FindOneQuery,
  ): Promise<FindOneOutputDto | null>;
}
