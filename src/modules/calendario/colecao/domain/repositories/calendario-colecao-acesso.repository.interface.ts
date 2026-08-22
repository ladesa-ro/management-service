import type {
  IAccessContext,
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { CalendarioColecaoAcesso } from "../calendario-colecao-acesso";
import type {
  CalendarioColecaoAcessoFindOneQuery,
  CalendarioColecaoAcessoFindOneQueryResult,
  CalendarioColecaoAcessoListQuery,
  CalendarioColecaoAcessoListQueryResult,
} from "../queries";

/**
 * Token de injecao para o repositorio de CalendarioColecaoAcesso
 */

export const ICalendarioColecaoAcessoRepository = Symbol("ICalendarioColecaoAcessoRepository");

/**
 * Port de saida para operacoes de persistencia de CalendarioColecaoAcesso.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 */

export interface ICalendarioColecaoAcessoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituido na forma do dominio. */
  loadById: IRepositoryLoadById<CalendarioColecaoAcesso>;

  /** Persiste o aggregate (sempre create — não há update de ColecaoAcesso). */
  save: IRepositorySave<CalendarioColecaoAcesso>;

  /** Soft-delete por ID (revogação). */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relacoes para exibicao. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioColecaoAcessoFindOneQuery,
    CalendarioColecaoAcessoFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibicao. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioColecaoAcessoListQuery,
    CalendarioColecaoAcessoListQueryResult
  >;

  /**
   * Retorna todas as concessões ATIVAS (não revogadas) de uma coleção, sem
   * paginação. Usado pelo resolvedor de papel efetivo (ACL), que precisa da
   * lista completa para aplicar as regras de resolução.
   */
  findAllActiveByColecaoId(
    accessContext: IAccessContext | null,
    colecaoId: string,
  ): Promise<CalendarioColecaoAcessoFindOneQueryResult[]>;
}
