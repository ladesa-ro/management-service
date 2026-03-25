import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import type {
  BlocoFindOneQuery,
  BlocoFindOneQueryResult,
  BlocoListQuery,
  BlocoListQueryResult,
} from "../queries";

export const IBlocoRepository = Symbol("IBlocoRepository");

/**
 * Port de saída para operações de persistência de Bloco.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */
export interface IBlocoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<Bloco>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<Bloco>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    BlocoFindOneQuery,
    BlocoFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<BlocoListQuery, BlocoListQueryResult>;
}
