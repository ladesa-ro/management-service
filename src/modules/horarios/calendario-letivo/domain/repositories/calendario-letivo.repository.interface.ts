import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { CalendarioLetivo } from "../calendario-letivo";
import type {
  CalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoListQuery,
  CalendarioLetivoListQueryResult,
} from "../queries";

/**
 * Token de injecao para o repositorio de CalendarioLetivo
 */
export const ICalendarioLetivoRepository = Symbol("ICalendarioLetivoRepository");

/**
 * Port de saida para operacoes de persistencia de CalendarioLetivo.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de dominio reconstituido.
 * O read side retorna dados hidratados para exibicao (query results).
 */
export interface ICalendarioLetivoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituido na forma do dominio. */
  loadById: IRepositoryLoadById<CalendarioLetivo>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<CalendarioLetivo>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relacoes para exibicao. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioLetivoFindOneQuery,
    CalendarioLetivoFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibicao. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioLetivoListQuery,
    CalendarioLetivoListQueryResult
  >;
}
