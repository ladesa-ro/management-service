import type { AccessContext } from "@/modules/@core/access-context";

/**
 * Interface para repositórios read-only (apenas listagem e busca por ID)
 * Usada por entidades que não suportam operações de escrita (Estado, Cidade, etc.)
 *
 * @template ListInputDto - Tipo do DTO de entrada para listagem
 * @template ListOutputDto - Tipo do DTO de saída para listagem (paginado)
 * @template FindOneInputDto - Tipo do DTO de entrada para busca única
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 */
export interface IReadOnlyRepositoryPort<
  ListInputDto,
  ListOutputDto,
  FindOneInputDto extends { id: string | number },
  FindOneOutputDto,
> {
  /**
   * Lista entidades com paginação e filtros
   */
  findAll(accessContext: AccessContext, dto: ListInputDto | null): Promise<ListOutputDto>;

  /**
   * Busca uma entidade por ID
   * @returns A entidade ou null se não encontrada
   */
  findById(accessContext: AccessContext, dto: FindOneInputDto): Promise<FindOneOutputDto | null>;
}
