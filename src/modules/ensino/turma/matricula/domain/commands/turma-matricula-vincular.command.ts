import { TurmaMatriculaFields } from "../turma-matricula.fields";

export const TurmaMatriculaVincularCommandFields = {
  turma: TurmaMatriculaFields.turma,
  perfil: TurmaMatriculaFields.perfil,
};

export class TurmaMatriculaVincularCommand {
  turmaId!: string;
  perfilId!: string;
}
