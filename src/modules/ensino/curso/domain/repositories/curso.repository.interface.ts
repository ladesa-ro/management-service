import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositorySoftDeleteById,
  PersistInput,
} from "@/domain/abstractions";
import type { ICurso } from "@/modules/ensino/curso";
import type {
  CursoFindOneQuery,
  CursoFindOneQueryResult,
  CursoListQuery,
  CursoListQueryResult,
} from "../queries";

/**
 * Token de injeção para o repositório de Curso
 */
export const ICursoRepository = Symbol("ICursoRepository");

/**
 * Port de saída para operações de persistência de Curso.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O read side retorna dados hidratados para exibição (query results).
 */
export interface ICursoRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Cria o registro e retorna o ID gerado. */
  create(data: Partial<PersistInput<ICurso>>): Promise<{ id: string }>;

  /** Atualiza campos do registro por ID. */
  update(id: string | number, data: Partial<PersistInput<ICurso>>): Promise<void>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    CursoFindOneQuery,
    CursoFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<CursoListQuery, CursoListQueryResult>;
}
