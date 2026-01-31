import type { PartialEntity } from "@/core/@shared";

/**
 * Interface para operações de criação/persistência em repositórios
 *
 * @template Entity - Tipo da entidade do repositório
 */
export interface ICreateRepositoryPort<Entity> {
  /**
   * Cria uma nova instância da entidade (não persiste)
   */
  create(): Entity;

  /**
   * Mescla dados em uma entidade existente
   */
  merge(entity: Entity, data: PartialEntity<Entity>): void;

  /**
   * Salva (cria ou atualiza) uma entidade
   */
  save(entity: PartialEntity<Entity>): Promise<Entity>;
}
