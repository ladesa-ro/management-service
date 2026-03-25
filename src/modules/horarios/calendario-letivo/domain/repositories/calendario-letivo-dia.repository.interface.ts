import type {
  IAccessContext,
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { CalendarioLetivoDia } from "../calendario-letivo-dia";
import type {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaFindOneQueryResult,
  CalendarioLetivoDiaListQuery,
  CalendarioLetivoDiaListQueryResult,
} from "../queries";

/**
 * Token de injecao para o repositorio de CalendarioLetivoDia
 */
export const ICalendarioLetivoDiaRepository = Symbol("ICalendarioLetivoDiaRepository");

/**
 * Port de saida para operacoes de persistencia de CalendarioLetivoDia.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de dominio reconstituido.
 * O read side retorna dados hidratados para exibicao (query results).
 */
export interface ICalendarioLetivoDiaRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituido na forma do dominio. */
  loadById: IRepositoryLoadById<CalendarioLetivoDia>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<CalendarioLetivoDia>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relacoes para exibicao. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioLetivoDiaFindOneQuery,
    CalendarioLetivoDiaFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibicao. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioLetivoDiaListQuery,
    CalendarioLetivoDiaListQueryResult
  >;

  /** Busca um dia por calendario e data. */
  findByCalendarioAndDate(
    accessContext: IAccessContext | null,
    calendarioLetivoId: string,
    data: string,
  ): Promise<CalendarioLetivoDiaFindOneQueryResult | null>;
}
