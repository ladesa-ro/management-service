import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { CalendarioColecao } from "../calendario-colecao";
import type {
  CalendarioColecaoFindOneQuery,
  CalendarioColecaoFindOneQueryResult,
  CalendarioColecaoListQuery,
  CalendarioColecaoListQueryResult,
} from "../queries";

/**
 * Token de injecao para o repositorio de CalendarioColecao
 */

export const ICalendarioColecaoRepository = Symbol("ICalendarioColecaoRepository");

/**
 * Port de saida para operacoes de persistencia de CalendarioColecao.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 */

export interface ICalendarioColecaoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituido na forma do dominio. */
  loadById: IRepositoryLoadById<CalendarioColecao>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<CalendarioColecao>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relacoes para exibicao. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioColecaoFindOneQuery,
    CalendarioColecaoFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibicao. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioColecaoListQuery,
    CalendarioColecaoListQueryResult
  >;
}
