import type { SelectQueryBuilder } from "typeorm";
import type { PartialEntity } from "@/core/@shared";
import type { EventoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/evento.entity";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  EventoFindOneInput,
  EventoFindOneOutput,
  EventoListInput,
  EventoListOutput,
} from "../../dtos";

/**
 * Token de injeção para o repositório de Evento
 */
export const EVENTO_REPOSITORY_PORT = Symbol("IEventoRepositoryPort");

/**
 * Port de saída para operações de persistência de Evento
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IEventoRepositoryPort {
  /**
   * Lista eventos com paginação
   */
  findAll(
    accessContext: AccessContext,
    dto: EventoListInput | null,
    selection?: string[] | boolean,
  ): Promise<EventoListOutput>;

  /**
   * Busca um evento por ID
   */
  findById(
    accessContext: AccessContext,
    dto: EventoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutput | null>;

  /**
   * Busca simplificada por ID
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EventoFindOneOutput | null>;

  /**
   * Cria uma nova instância de entidade (não persiste)
   */
  create(): EventoEntity;

  /**
   * Mescla dados em uma entidade existente
   */
  merge(entity: EventoEntity, data: PartialEntity<EventoEntity>): void;

  /**
   * Salva (cria ou atualiza) uma entidade
   */
  save(entity: PartialEntity<EventoEntity>): Promise<EventoEntity>;

  /**
   * Executa soft delete por ID
   */
  softDeleteById(id: string): Promise<void>;

  /**
   * Cria um QueryBuilder para a entidade.
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(alias: string): SelectQueryBuilder<EventoEntity>;
}
