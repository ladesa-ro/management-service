import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";

/**
 * Interface base para ports de use case (entrada)
 * Define operações CRUD padrão que todo service deve implementar
 *
 * @template ListInputDto - Tipo do DTO de entrada para listagem
 * @template ListOutputDto - Tipo do DTO de saída para listagem (paginado)
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 * @template CreateInputDto - Tipo do DTO de entrada para criação
 * @template UpdateInputDto - Tipo do DTO de entrada para atualização
 */
export interface IBaseCrudUseCasePort<
  ListInputDto,
  ListOutputDto,
  FindOneOutputDto,
  CreateInputDto,
  UpdateInputDto,
> {
  /**
   * Lista entidades com paginação e filtros
   */
  findAll(
    accessContext: AccessContext,
    dto: ListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<ListOutputDto>;

  /**
   * Busca uma entidade por ID
   * @returns A entidade ou null se não encontrada
   */
  findById(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null>;

  /**
   * Busca uma entidade por ID, lançando erro se não encontrada
   * @throws ResourceNotFoundError se a entidade não existir
   */
  findByIdStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto>;

  /**
   * Cria uma nova entidade
   */
  create(accessContext: AccessContext, dto: CreateInputDto): Promise<FindOneOutputDto>;

  /**
   * Atualiza uma entidade existente
   */
  update(accessContext: AccessContext, id: string, dto: UpdateInputDto): Promise<FindOneOutputDto>;

  /**
   * Remove (soft delete) uma entidade por ID
   * @returns true se a entidade foi removida com sucesso
   */
  deleteOneById(accessContext: AccessContext, id: string): Promise<boolean>;
}
