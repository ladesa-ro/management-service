import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { Turma } from "@/modules/ensino/turma/domain/turma";
import type {
  TurmaFindOneQuery,
  TurmaFindOneQueryResult,
  TurmaListQuery,
  TurmaListQueryResult,
} from "../queries";

/**
 * Token de injeção para o repositório de Turma
 */
export const ITurmaRepository = Symbol("ITurmaRepository");

/**
 * Port de saída para operações de persistência de Turma.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */
export interface ITurmaRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<Turma>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<Turma>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  /** Atualiza campos arbitrários por ID (usado para imagem). */
  update(id: string | number, data: Record<string, unknown>): Promise<void>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    TurmaFindOneQuery,
    TurmaFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<TurmaListQuery, TurmaListQueryResult>;
}
