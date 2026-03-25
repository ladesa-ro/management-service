import type {
  IAccessContext,
  IRepositoryGetFindAllQueryResult,
  IRepositoryGetFindOneQueryResult,
  IRepositorySoftDeleteById,
} from "@/domain/abstractions";
import type {
  UsuarioFindOneQuery,
  UsuarioFindOneQueryResult,
  UsuarioListQuery,
  UsuarioListQueryResult,
} from "../queries";
import type {
  UsuarioEnsinoCursoRef,
  UsuarioEnsinoDisciplinaRef,
  UsuarioEnsinoTurmaRef,
} from "../queries/usuario-ensino.query.result";

export const IUsuarioRepository = Symbol("IUsuarioRepository");

/**
 * Port de saída para operações de persistência de Usuario.
 *
 * Separado em write side (command handlers) e read side (query handlers).
 * O read side retorna dados hidratados para exibição (query results).
 */
export interface IUsuarioRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Cria o registro e retorna o ID gerado. */
  create(data: Record<string, unknown>): Promise<{ id: string }>;

  /** Atualiza campos do registro por ID. */
  update(id: string | number, data: Record<string, unknown>): Promise<void>;

  /** Soft-delete por ID. */
  softDeleteById: IRepositorySoftDeleteById;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado com todas as relações para exibição. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    UsuarioFindOneQuery,
    UsuarioFindOneQueryResult
  >;

  /** Retorna lista paginada com dados hidratados para exibição. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<UsuarioListQuery, UsuarioListQueryResult>;

  // ==========================================
  // Operações de domínio específicas
  // ==========================================

  /** Busca simplificada por ID (sem relações expandidas). */
  findByIdSimple(
    accessContext: IAccessContext | null,
    id: string,
  ): Promise<UsuarioFindOneQueryResult | null>;

  /** Busca por matrícula. */
  findByMatricula(matricula: string): Promise<UsuarioFindOneQueryResult | null>;

  /** Verifica disponibilidade de matrícula. */
  isMatriculaAvailable(matricula: string, excludeUsuarioId?: string | null): Promise<boolean>;

  /** Verifica disponibilidade de email. */
  isEmailAvailable(email: string, excludeUsuarioId?: string | null): Promise<boolean>;

  /** Resolve a matrícula de um usuário pelo ID. */
  resolveMatricula(id: string): Promise<string | null>;

  /** Retorna a estrutura de ensino do usuário (disciplinas → cursos → turmas). */
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
}
