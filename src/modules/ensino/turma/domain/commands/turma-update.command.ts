import { AmbienteInputRef } from "@/modules/ambientes/ambiente";
import { CursoInputRef } from "@/modules/ensino/curso";
import { TurmaFields } from "../turma.fields";

export const TurmaUpdateCommandFields = {
  periodo: TurmaFields.periodo,
  nome: TurmaFields.nome,
  curso: TurmaFields.curso,
  ambientePadraoAula: TurmaFields.ambientePadraoAula,
};

export class TurmaUpdateCommand {
  periodo?: string;
  nome?: string | null;
  curso?: CursoInputRef;
  ambientePadraoAula?: AmbienteInputRef | null;
}
