import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { Estagiario } from "../estagiario";
import type {
  EstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
  EstagiarioListQueryResult,
} from "../queries";

export const IEstagiarioRepository = Symbol("IEstagiarioRepository");

/**
 * Port de saída para operações de persistência de Estagiario.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */

export interface IEstagiarioRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<Estagiario>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<Estagiario>;

  /** Busca um estagiário ativo pelo ID do usuário vinculado ao perfil. */
  findByUsuarioId(usuarioId: string): Promise<EstagiarioFindOneQueryResult | null>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    EstagiarioFindOneQuery,
    EstagiarioFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    EstagiarioListQuery,
    EstagiarioListQueryResult
  >;
}
