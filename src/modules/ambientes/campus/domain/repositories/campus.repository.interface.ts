import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { Campus } from "@/modules/ambientes/campus/domain/campus";
import type {
  CampusFindOneQuery,
  CampusFindOneQueryResult,
  CampusListQuery,
  CampusListQueryResult,
} from "../queries";

export const ICampusRepository = Symbol("ICampusRepository");

/**
 * Port de saída para operações de persistência de Campus.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */
export interface ICampusRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<Campus>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<Campus>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CampusFindOneQuery,
    CampusFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<CampusListQuery, CampusListQueryResult>;
}
