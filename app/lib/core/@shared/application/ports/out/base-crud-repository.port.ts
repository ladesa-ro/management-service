import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Interface base para ports de repositório (saída)
 * Define operações CRUD padrão que todo repositório deve implementar
 *
 * @template Entity - Tipo da entidade do repositório
 * @template ListOutputDto - Tipo do DTO de saída para listagem (paginado)
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 */
export interface IBaseCrudRepositoryPort<Entity, ListOutputDto, FindOneOutputDto> {
  /**
   * Lista entidades com paginação e filtros
   */
  findAll(
    accessContext: AccessContext,
    dto: unknown,
    selection?: string[] | boolean,
  ): Promise<ListOutputDto>;

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

  /**
   * Salva (cria ou atualiza) uma entidade
   */
  save(entity: DeepPartial<Entity>): Promise<Entity>;

  /**
   * Cria uma nova instância da entidade (não persiste)
   */
  create(): Entity;

  /**
   * Mescla dados em uma entidade existente
   */
  merge(entity: Entity, data: DeepPartial<Entity>): void;

  /**
   * Realiza soft delete de uma entidade por ID
   */
  softDeleteById(id: string | number): Promise<void>;
}
