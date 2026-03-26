import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { Estagio, IHorarioEstagio } from "../estagio";
import type {
  EstagioFindOneQuery,
  EstagioFindOneQueryResult,
  EstagioListQuery,
  EstagioListQueryResult,
} from "../queries";

export const IEstagioRepository = Symbol("IEstagioRepository");

/**
 * Port de saída para operações de persistência de Estagio.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */

export interface IEstagioRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<Estagio>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<Estagio>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  /** Substitui horários de estágio (soft-delete dos antigos + insert dos novos). */
  replaceHorariosEstagio(estagioId: string, horarios: IHorarioEstagio[]): Promise<void>;

  /** Soft-delete dos horários de estágio. */
  softDeleteHorariosEstagio(estagioId: string): Promise<void>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    EstagioFindOneQuery,
    EstagioFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<EstagioListQuery, EstagioListQueryResult>;
}
