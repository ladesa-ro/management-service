import { UsuarioEnsinoCursoRef } from "./UsuarioEnsinoCursoRef";
import { UsuarioEnsinoDisciplinaRef } from "./UsuarioEnsinoDisciplinaRef";
import { UsuarioEnsinoTurmaRef } from "./UsuarioEnsinoTurmaRef";
import { UsuarioFindOneOutputDto } from "./UsuarioFindOneOutputDto";

export interface UsuarioEnsinoOutput {
  usuario: UsuarioFindOneOutputDto;
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
