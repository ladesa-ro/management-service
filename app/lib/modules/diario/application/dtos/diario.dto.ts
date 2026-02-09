import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import { AmbienteFindOneOutputDto, AmbienteInputRefDto } from "@/modules/ambiente";
import {
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoInputRefDto,
} from "@/modules/calendario-letivo";
import {
  DisciplinaFindOneOutputDto,
  DisciplinaInputRefDto,
} from "@/modules/disciplina/application/dtos";
import { ImagemFindOneOutputDto, ImagemInputRefDto } from "@/modules/imagem";
import { TurmaFindOneOutputDto, TurmaInputRefDto } from "@/modules/turma";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioFindOneInputDto extends FindOneInputDto {}

export class DiarioFindOneOutputDto extends EntityOutputDto {
  ativo!: boolean;
  calendarioLetivo!: CalendarioLetivoFindOneOutputDto;
  turma!: TurmaFindOneOutputDto;
  disciplina!: DisciplinaFindOneOutputDto;
  ambientePadrao!: AmbienteFindOneOutputDto | null;
  imagemCapa!: ImagemFindOneOutputDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiarioListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.turma.id"?: IFilterAcceptableValues;
  "filter.disciplina.id"?: IFilterAcceptableValues;
  "filter.calendarioLetivo.id"?: IFilterAcceptableValues;
}

export class DiarioListOutputDto extends PaginationResultDto<DiarioFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiarioCreateInputDto {
  ativo!: boolean;
  calendarioLetivo!: CalendarioLetivoInputRefDto;
  turma!: TurmaInputRefDto;
  disciplina!: DisciplinaInputRefDto;
  ambientePadrao?: AmbienteInputRefDto | null;
  imagemCapa?: ImagemInputRefDto | null;
}

export class DiarioUpdateInputDto {
  ativo?: boolean;
  calendarioLetivo?: CalendarioLetivoInputRefDto;
  turma?: TurmaInputRefDto;
  disciplina?: DisciplinaInputRefDto;
  ambientePadrao?: AmbienteInputRefDto | null;
  imagemCapa?: ImagemInputRefDto | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DiarioInputRefDto = ObjectUuidRefDto;
