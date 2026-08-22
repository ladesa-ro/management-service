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

/**
 * Port de saida para operacoes de persistencia de TurmaMatricula.
 *
 * Separado em write side (command handlers) e read side (query handlers),
 * seguindo o mesmo padrao de CalendarioColecaoAcesso.
 */
export interface ITurmaMatriculaRepository {
  // ==========================================
  // Write side — usado por command handlers
  // ==========================================

  /** Carrega o aggregate reconstituido na forma do dominio. */
  loadById: IRepositoryLoadById<TurmaMatricula>;

  /** Persiste o aggregate (sempre create — nao ha update de matricula). */
  save: IRepositorySave<TurmaMatricula>;

  /** Soft-delete por ID (desmatricula). */
  softDeleteById: IRepositorySoftDeleteById;

  /** Existe alguma matricula ATIVA para o par (turma, perfil)? */
  existsActiveByTurmaAndPerfil(turmaId: string, perfilId: string): Promise<boolean>;

  // ==========================================
  // Read side — usado por query handlers
  // ==========================================

  /** Retorna um registro hidratado para exibicao. */
  getFindOneQueryResult: IRepositoryGetFindOneQueryResult<
    TurmaMatriculaFindOneQuery,
    TurmaMatriculaFindOneQueryResult
  >;

  /** Retorna lista paginada, filtravel por turma.id e/ou perfil.id. */
  getFindAllQueryResult: IRepositoryGetFindAllQueryResult<
    TurmaMatriculaListQuery,
    TurmaMatriculaListQueryResult
  >;

  /**
   * Retorna todas as matriculas ATIVAS de uma turma para o conjunto de perfis
   * informado, sem paginacao. Usado para checagem de acesso (ex: aluno
   * consultando a grade de horario da propria turma).
   */
  findActiveByTurmaAndPerfilIds(
    turmaId: string,
    perfilIds: string[],
  ): Promise<TurmaMatriculaFindOneQueryResult[]>;

  /**
   * O usuario (por qualquer um de seus perfis ativos) possui matricula ATIVA
   * na turma informada? Usado pela consulta de ocorrencias do calendario para
   * liberar a visualizacao da propria grade de horario a um aluno matriculado,
   * mesmo quando o agendamento pertence a uma colecao sem ACL concedida a ele.
   */
  existsActiveForUsuarioInTurma(usuarioId: string, turmaId: string): Promise<boolean>;
}
