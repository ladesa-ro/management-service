import type {
  IAccessContext,
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeProfessor } from "../calendario-indisponibilidade-professor";
import type {
  CalendarioIndisponibilidadeProfessorFindOneQuery,
  CalendarioIndisponibilidadeProfessorFindOneQueryResult,
  CalendarioIndisponibilidadeProfessorListQuery,
  CalendarioIndisponibilidadeProfessorListQueryResult,
} from "../queries";

/**
 * Token de injecao para o repositorio de CalendarioIndisponibilidadeProfessor
 */

export const ICalendarioIndisponibilidadeProfessorRepository = Symbol(
  "ICalendarioIndisponibilidadeProfessorRepository",
);

/**
 * Port de saida para operacoes de persistencia de CalendarioIndisponibilidadeProfessor.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 */

export interface ICalendarioIndisponibilidadeProfessorRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituido na forma do dominio. */
  loadById: IRepositoryLoadById<CalendarioIndisponibilidadeProfessor>;

  /** Persiste o aggregate (create). */
  save: IRepositorySave<CalendarioIndisponibilidadeProfessor>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relacoes para exibicao. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CalendarioIndisponibilidadeProfessorFindOneQuery,
    CalendarioIndisponibilidadeProfessorFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibicao. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    CalendarioIndisponibilidadeProfessorListQuery,
    CalendarioIndisponibilidadeProfessorListQueryResult
  >;

  /**
   * Retorna todas as indisponibilidades ATIVAS de um perfil — regras semanais e
   * exceções pontuais, sem filtro de período. A seleção por período (aplicar
   * regra semanal sempre; exceção pontual só quando a data cai no intervalo)
   * é responsabilidade do query handler, não do repositório.
   */
  findAllAtivasByPerfilId(
    accessContext: IAccessContext | null,
    perfilId: string,
  ): Promise<CalendarioIndisponibilidadeProfessorFindOneQueryResult[]>;
}
