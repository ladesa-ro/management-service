import type {
  IAccessContext,
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type {
  PerfilFindOneQuery,
  PerfilFindOneQueryResult,
  PerfilListQuery,
  PerfilListQueryResult,
} from "../queries";

export const IPerfilRepository = Symbol("IPerfilRepository");

/**
 * Port de saída para operações de persistência de Perfil.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O read side retorna dados hidratados para exibição (query results).
 */
export interface IPerfilRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Cria o registro e retorna o ID gerado. */
  create(data: Record<string, unknown>): Promise<{ id: string | number }>;

  /** Atualiza campos do registro por ID. */
  update(id: string | number, data: Record<string, unknown>): Promise<void>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    PerfilFindOneQuery,
    PerfilFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<PerfilListQuery, PerfilListQueryResult>;

  // ==========================================
  // Operações de domínio específicas
  // ==========================================

  /** Retorna todos os perfis ativos de um usuário. */
  findAllActiveByUsuarioId(
    accessContext: IAccessContext | null,
    usuarioId: string,
  ): Promise<PerfilFindOneQueryResult[]>;

  /** Retorna perfis de um usuário em um campus específico. */
  findByUsuarioAndCampus(usuarioId: string, campusId: string): Promise<PerfilFindOneQueryResult[]>;

  /** Desativa perfis em lote por IDs. */
  deactivateByIds(ids: string[]): Promise<void>;
}
