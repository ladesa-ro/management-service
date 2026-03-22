import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositoryFindByIdSimple,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { IDiarioProfessor } from "@/modules/ensino/diario";
import type { DiarioProfessorFindOneQueryResult, DiarioProfessorListQueryResult } from "../queries";

export const IDiarioProfessorRepository = Symbol("IDiarioProfessorRepository");

export type IDiarioProfessorRepository = IRepositoryFindAll<DiarioProfessorListQueryResult> &
  IRepositoryFindById<DiarioProfessorFindOneQueryResult> &
  IRepositoryFindByIdSimple<DiarioProfessorFindOneQueryResult> &
  IRepositoryCreate<IDiarioProfessor> &
  IRepositoryUpdate<IDiarioProfessor> &
  IRepositorySoftDelete & {
    softDeleteByDiarioId(diarioId: string): Promise<void>;

    bulkCreate(
      entries: Array<{
        situacao: boolean;
        diarioId: string;
        perfilId: string;
      }>,
    ): Promise<void>;
  };
