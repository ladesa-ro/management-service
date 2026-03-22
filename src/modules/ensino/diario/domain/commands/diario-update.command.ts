import { AmbienteInputRef } from "@/modules/ambientes/ambiente";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { DisciplinaInputRef } from "@/modules/ensino/disciplina";
import { TurmaInputRef } from "@/modules/ensino/turma";
import { CalendarioLetivoInputRef } from "@/modules/horarios/calendario-letivo";
import { DiarioFields } from "../diario.fields";

export const DiarioUpdateCommandFields = {
  ativo: DiarioFields.ativo,
  calendarioLetivo: DiarioFields.calendarioLetivo,
  turma: DiarioFields.turma,
  disciplina: DiarioFields.disciplina,
  ambientePadrao: DiarioFields.ambientePadrao,
  imagemCapa: DiarioFields.imagemCapa,
};

export class DiarioUpdateCommand {
  ativo?: boolean;
  calendarioLetivo?: CalendarioLetivoInputRef;
  turma?: TurmaInputRef;
  disciplina?: DisciplinaInputRef;
  ambientePadrao?: AmbienteInputRef | null;
  imagemCapa?: ImagemInputRef | null;
}
