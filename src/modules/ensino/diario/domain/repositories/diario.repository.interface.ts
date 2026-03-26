import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { Diario } from "@/modules/ensino/diario/domain/diario";
import type {
  DiarioFindOneQuery,
  DiarioFindOneQueryResult,
  DiarioListQuery,
  DiarioListQueryResult,
} from "../queries";

/**
 * Token de injeção para o repositório de Diario
 */

export const IDiarioRepository = Symbol("IDiarioRepository");

/**
 * Port de saída para operações de persistência de Diario.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */

export interface IDiarioRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<Diario>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<Diario>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    DiarioFindOneQuery,
    DiarioFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<DiarioListQuery, DiarioListQueryResult>;
}
