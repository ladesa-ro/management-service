import type { AmbienteInputRefDto } from "./AmbienteInputRefDto";
import type { CalendarioLetivoInputRefDto } from "./CalendarioLetivoInputRefDto";
import type { DisciplinaInputRefDto } from "./DisciplinaInputRefDto";
import type { ImagemInputRefDto } from "./ImagemInputRefDto";
import type { TurmaInputRefDto } from "./TurmaInputRefDto";

export class DiarioCreateInputDto {
  ativo!: boolean;
  calendarioLetivo!: CalendarioLetivoInputRefDto;
  turma!: TurmaInputRefDto;
  disciplina!: DisciplinaInputRefDto;
  ambientePadrao?: AmbienteInputRefDto | null;
  imagemCapa?: ImagemInputRefDto | null;
}
