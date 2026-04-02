import { AmbienteInputRef } from "@/modules/ambientes/ambiente";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { CalendarioLetivoInputRef } from "@/modules/calendario/letivo";
import { DisciplinaInputRef } from "@/modules/ensino/disciplina";
import { TurmaInputRef } from "@/modules/ensino/turma";
import { DiarioFields } from "../diario.fields";

export const DiarioCreateCommandFields = {
  ativo: DiarioFields.ativo,
  calendarioLetivo: DiarioFields.calendarioLetivo,
  turma: DiarioFields.turma,
  disciplina: DiarioFields.disciplina,
  ambientePadrao: DiarioFields.ambientePadrao,
  imagemCapa: DiarioFields.imagemCapa,
};

export class DiarioCreateCommand {
  ativo!: boolean;
  calendarioLetivo!: CalendarioLetivoInputRef;
  turma!: TurmaInputRef;
  disciplina!: DisciplinaInputRef;
  ambientePadrao?: AmbienteInputRef | null;
  imagemCapa?: ImagemInputRef | null;
}
