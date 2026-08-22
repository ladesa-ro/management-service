import type {
  IAccessContext,
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeAmbiente } from "../calendario-indisponibilidade-ambiente";
import type {
  CalendarioIndisponibilidadeAmbienteFindOneQuery,
  CalendarioIndisponibilidadeAmbienteFindOneQueryResult,
  CalendarioIndisponibilidadeAmbienteListQuery,
  CalendarioIndisponibilidadeAmbienteListQueryResult,
} from "../queries";

/**
 * Token de injecao para o repositorio de CalendarioIndisponibilidadeAmbiente
 */

export const ICalendarioIndisponibilidadeAmbienteRepository = Symbol(
  "ICalendarioIndisponibilidadeAmbienteRepository",
);

/**
 * Port de saida para operacoes de persistencia de CalendarioIndisponibilidadeAmbiente.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 */

export interface ICalendarioIndisponibilidadeAmbienteRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituido na forma do dominio. */
  loadById: IRepositoryLoadById<CalendarioIndisponibilidadeAmbiente>;

  /** Persiste o aggregate (create). */
  save: IRepositorySave<CalendarioIndisponibilidadeAmbiente>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relacoes para exibicao. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioIndisponibilidadeAmbienteFindOneQuery,
    CalendarioIndisponibilidadeAmbienteFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibicao. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioIndisponibilidadeAmbienteListQuery,
    CalendarioIndisponibilidadeAmbienteListQueryResult
  >;

  /**
   * Retorna todas as indisponibilidades ATIVAS de um ambiente — regras semanais e
   * exceções pontuais, sem filtro de período. A seleção por período (aplicar
   * regra semanal sempre; exceção pontual só quando a data cai no intervalo)
   * é responsabilidade do query handler, não do repositório.
   */
  findAllAtivasByAmbienteId(
    accessContext: IAccessContext | null,
    ambienteId: string,
  ): Promise<CalendarioIndisponibilidadeAmbienteFindOneQueryResult[]>;
}
