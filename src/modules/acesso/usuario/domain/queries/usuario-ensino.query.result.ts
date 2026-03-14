import { UsuarioFindOneQueryResult } from "./usuario-find-one.query.result";

export interface UsuarioEnsinoTurmaRef {
  id: string;
  periodo: string;
}

export interface UsuarioEnsinoCursoRef {
  id: string;
  nome: string;
}

export interface UsuarioEnsinoDisciplinaRef {
  id: string;
  nome: string;
}

export interface UsuarioEnsinoQueryResult {
  usuario: UsuarioFindOneQueryResult;
  disciplinas: Array<{
    disciplina: UsuarioEnsinoDisciplinaRef;
    cursos: Array<{
      curso: UsuarioEnsinoCursoRef;
      turmas: Array<{
        turma: UsuarioEnsinoTurmaRef;
      }>;
    }>;
  }>;
}
