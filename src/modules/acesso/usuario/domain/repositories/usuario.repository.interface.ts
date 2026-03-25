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
  Omit<IRepositoryCreate<object>, "create"> &
  IRepositoryUpdate<object> &
  IRepositorySoftDelete & {
    create(data: Record<string, unknown>): Promise<{ id: string }>;

    findByMatricula(matricula: string): Promise<UsuarioFindOneQueryResult | null>;

    isMatriculaAvailable(matricula: string, excludeUsuarioId?: string | null): Promise<boolean>;

    isEmailAvailable(email: string, excludeUsuarioId?: string | null): Promise<boolean>;

    resolveMatricula(id: string): Promise<string | null>;

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
