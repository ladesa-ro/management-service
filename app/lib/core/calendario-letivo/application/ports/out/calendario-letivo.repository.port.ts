import type { DeepPartial } from "typeorm";
import type { CalendarioLetivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  CalendarioLetivoFindOneInput,
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoListInput,
  CalendarioLetivoListOutput,
} from "../../dtos";

/**
 * Token de injecao para o repositorio de CalendarioLetivo
 */
export const CALENDARIO_LETIVO_REPOSITORY_PORT = Symbol("ICalendarioLetivoRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de CalendarioLetivo
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface ICalendarioLetivoRepositoryPort {
  /**
   * Lista calendarios letivos com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @param selection Campos a serem selecionados (GraphQL/otimizacao)
   * @returns Lista paginada de calendarios letivos
   */
  findAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInput | null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutput>;

  /**
   * Busca um calendario letivo por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID do calendario letivo
   * @param selection Campos a serem selecionados
   * @returns CalendarioLetivo encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput | null>;

  /**
   * Busca um calendario letivo por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param id ID do calendario letivo
   * @param selection Campos a serem selecionados
   * @returns CalendarioLetivo encontrado ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput | null>;

  /**
   * Salva (cria ou atualiza) um calendario letivo
   * @param calendarioLetivo Dados parciais do calendario letivo a ser salvo
   * @returns CalendarioLetivo salvo
   */
  save(calendarioLetivo: DeepPartial<CalendarioLetivoEntity>): Promise<CalendarioLetivoEntity>;

  /**
   * Cria uma nova entidade calendario letivo
   * @returns Nova instancia de CalendarioLetivoEntity
   */
  create(): CalendarioLetivoEntity;

  /**
   * Mescla dados parciais em um calendario letivo existente
   * @param calendarioLetivo CalendarioLetivo base
   * @param data Dados a serem mesclados
   */
  merge(calendarioLetivo: CalendarioLetivoEntity, data: DeepPartial<CalendarioLetivoEntity>): void;

  /**
   * Soft delete de um calendario letivo por ID
   * @param id ID do calendario letivo
   */
  softDeleteById(id: string): Promise<void>;
}
