import type { SelectQueryBuilder } from "typeorm";
import type { AccessContext } from "@/modules/@core/access-context";
import type { IEvento } from "@/modules/horarios/evento";
import type { EventoEntity } from "@/modules/horarios/evento/infrastructure/persistence/typeorm";
import type {
  EventoFindOneInputDto,
  EventoFindOneOutputDto,
  EventoListInputDto,
  EventoListOutputDto,
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
    dto: EventoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<EventoListOutputDto>;

  /**
   * Busca um evento por ID
   */
  findById(
    accessContext: AccessContext,
    dto: EventoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EventoFindOneOutputDto | null>;

  /**
   * Busca simplificada por ID
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EventoFindOneOutputDto | null>;

  /**
   * Cria uma entidade a partir de dados de domínio
   */
  createFromDomain(data: IEvento): Promise<{ id: string | number }>;

  /**
   * Atualiza uma entidade a partir de dados de domínio parciais
   */
  updateFromDomain(id: string | number, data: Partial<IEvento>): Promise<void>;

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
