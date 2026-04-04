import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina";
import type {
  DisciplinaFindOneQuery,
  DisciplinaFindOneQueryResult,
  DisciplinaListQuery,
  DisciplinaListQueryResult,
} from "../queries";

export const IDisciplinaRepository = Symbol("IDisciplinaRepository");

/**
 * Port de saída para operações de persistência de Disciplina.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O write side retorna o aggregate de domínio reconstituído.
 * O read side retorna dados hidratados para exibição (query results).
 */

export interface IDisciplinaRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituído na forma do domínio. */
  loadById: IRepositoryLoadById<Disciplina>;

  /** Persiste o aggregate (create ou update). */
  save: IRepositorySave<Disciplina>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  /** Atualiza a FK de um campo de imagem por ID. */
  updateImagemField(id: string, fieldName: string, imagemId: string | null): Promise<void>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    DisciplinaFindOneQuery,
    DisciplinaFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    DisciplinaListQuery,
    DisciplinaListQueryResult
  >;
}
