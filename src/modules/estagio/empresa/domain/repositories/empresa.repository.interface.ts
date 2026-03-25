import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { Empresa } from "../empresa";
import type {
  EmpresaFindOneQuery,
  EmpresaFindOneQueryResult,
  EmpresaListQuery,
  EmpresaListQueryResult,
} from "../queries";

export const IEmpresaRepository = Symbol("IEmpresaRepository");

/**
 * Port de saída para operações de persistência de Empresa.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */
export interface IEmpresaRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<Empresa>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<Empresa>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    EmpresaFindOneQuery,
    EmpresaFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<EmpresaListQuery, EmpresaListQueryResult>;
}
