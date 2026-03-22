import type {
  IRepositoryCreate,
  IRepositoryFindAll,
  IRepositoryFindById,
  IRepositoryFindByIdSimple,
  IRepositorySoftDelete,
  IRepositoryUpdate,
} from "@/domain/abstractions";
import type { UsuarioFindOneQueryResult, UsuarioListQueryResult } from "../queries";
import type {
  UsuarioEnsinoCursoRef,
  UsuarioEnsinoDisciplinaRef,
  UsuarioEnsinoTurmaRef,
} from "../queries/usuario-ensino.query.result";

export const IUsuarioRepository = Symbol("IUsuarioRepository");

export type IUsuarioRepository = IRepositoryFindAll<UsuarioListQueryResult> &
  IRepositoryFindById<UsuarioFindOneQueryResult> &
  IRepositoryFindByIdSimple<UsuarioFindOneQueryResult> &
  IRepositoryCreate<object> &
  IRepositoryUpdate<object> &
  IRepositorySoftDelete & {
    findByMatricula(
      matricula: string,
      selection?: string[] | boolean | null,
    ): Promise<UsuarioFindOneQueryResult | null>;

    isMatriculaAvailable(matricula: string, excludeUsuarioId?: string | null): Promise<boolean>;

    isEmailAvailable(email: string, excludeUsuarioId?: string | null): Promise<boolean>;

    resolveProperty<Property extends string>(id: string, property: Property): Promise<unknown>;

    findUsuarioEnsino(usuarioId: string): Promise<{
      disciplinas: Array<{
        disciplina: UsuarioEnsinoDisciplinaRef;
        cursos: Array<{
          curso: UsuarioEnsinoCursoRef;
          turmas: Array<{
            turma: UsuarioEnsinoTurmaRef;
          }>;
        }>;
      }>;
    }>;
  };
