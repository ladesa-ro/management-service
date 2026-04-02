import { AmbienteInputRef } from "@/modules/ambientes/ambiente";
import { CalendarioLetivoInputRef } from "@/modules/calendario/letivo";
import { DisciplinaInputRef } from "@/modules/ensino/disciplina";
import { TurmaInputRef } from "@/modules/ensino/turma";
import { DiarioFields } from "../diario.fields";

export const DiarioUpdateCommandFields = {
  ativo: DiarioFields.ativo,
  calendarioLetivo: DiarioFields.calendarioLetivo,
  turma: DiarioFields.turma,
  disciplina: DiarioFields.disciplina,
  ambientePadrao: DiarioFields.ambientePadrao,
};

export class DiarioUpdateCommand {
  ativo?: boolean;
  calendarioLetivo?: CalendarioLetivoInputRef;
  turma?: TurmaInputRef;
  disciplina?: DisciplinaInputRef;
  ambientePadrao?: AmbienteInputRef | null;
}
