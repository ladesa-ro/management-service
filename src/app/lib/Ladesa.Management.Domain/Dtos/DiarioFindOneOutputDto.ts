import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { AmbienteFindOneOutputDto } from "./AmbienteFindOneOutputDto";
import { CalendarioLetivoFindOneOutputDto } from "./CalendarioLetivoFindOneOutputDto";
import { DisciplinaFindOneOutputDto } from "./DisciplinaFindOneOutputDto";
import { ImagemFindOneOutputDto } from "./ImagemFindOneOutputDto";
import { TurmaFindOneOutputDto } from "./TurmaFindOneOutputDto";

export class DiarioFindOneOutputDto extends EntityOutputDto {
  ativo!: boolean;
  calendarioLetivo!: CalendarioLetivoFindOneOutputDto;
  turma!: TurmaFindOneOutputDto;
  disciplina!: DisciplinaFindOneOutputDto;
  ambientePadrao!: AmbienteFindOneOutputDto | null;
  imagemCapa!: ImagemFindOneOutputDto | null;
}
