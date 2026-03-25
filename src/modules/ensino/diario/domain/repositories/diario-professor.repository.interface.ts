import type {
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositorySoftDeleteById,
  PersistInput,
} from "@/domain/abstractions";
import type { IDiarioProfessor } from "@/modules/ensino/diario";
import type {
  DiarioProfessorFindOneQuery,
  DiarioProfessorFindOneQueryResult,
  DiarioProfessorListQuery,
  DiarioProfessorListQueryResult,
} from "../queries";

export const IDiarioProfessorRepository = Symbol("IDiarioProfessorRepository");

export interface IDiarioProfessorRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Cria o registro e retorna o ID gerado. */
  create(data: Partial<PersistInput<IDiarioProfessor>>): Promise<{ id: string | number }>;

  /** Atualiza campos do registro por ID. */
  update(id: string | number, data: Partial<PersistInput<IDiarioProfessor>>): Promise<void>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  /** Soft-delete de todos os professores de um diário. */
  softDeleteByDiarioId(diarioId: string): Promise<void>;

  /** Cria múltiplos registros em lote. */
  bulkCreate(
    entries: Array<{
      situacao: boolean;
      diarioId: string;
      perfilId: string;
    }>,
  ): Promise<void>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    DiarioProfessorFindOneQuery,
    DiarioProfessorFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    DiarioProfessorListQuery,
    DiarioProfessorListQueryResult
  >;
}
