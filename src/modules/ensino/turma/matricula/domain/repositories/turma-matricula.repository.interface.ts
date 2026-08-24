import type {
  IAccessContext,
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositoryLoadById,
  IRepositorySave,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type { TurmaMatricula } from "../turma-matricula";
import type {
  TurmaMatriculaFindOneQuery,
  TurmaMatriculaFindOneQueryResult,
  TurmaMatriculaListQuery,
  TurmaMatriculaListQueryResult,
} from "../queries";

export const ITurmaMatriculaRepository = Symbol("ITurmaMatriculaRepository");

export interface ITurmaMatriculaRepository {

  loadById: IRepositoryLoadById<TurmaMatricula>;

  save: IRepositorySave<TurmaMatricula>;

  softDeleteById: IRepositorySoftDeleteById;

  existsActiveByTurmaAndPerfil(turmaId: string, perfilId: string): Promise<boolean>;

  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    TurmaMatriculaFindOneQuery,
    TurmaMatriculaFindOneQueryResult
  >;

  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    TurmaMatriculaListQuery,
    TurmaMatriculaListQueryResult
  >;

  findActiveByTurmaAndPerfilIds(
    turmaId: string,
    perfilIds: string[],
  ): Promise<TurmaMatriculaFindOneQueryResult[]>;

  existsActiveForUsuarioInTurma(usuarioId: string, turmaId: string): Promise<boolean>;
}
