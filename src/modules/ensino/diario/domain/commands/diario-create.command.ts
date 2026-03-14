import { AmbienteInputRef } from "@/modules/ambientes/ambiente";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { DisciplinaInputRef } from "@/modules/ensino/disciplina";
import { TurmaInputRef } from "@/modules/ensino/turma";
import { CalendarioLetivoInputRef } from "@/modules/horarios/calendario-letivo";

export class DiarioCreateCommand {
  ativo!: boolean;
  calendarioLetivo!: CalendarioLetivoInputRef;
  turma!: TurmaInputRef;
  disciplina!: DisciplinaInputRef;
  ambientePadrao?: AmbienteInputRef | null;
  imagemCapa?: ImagemInputRef | null;
}
