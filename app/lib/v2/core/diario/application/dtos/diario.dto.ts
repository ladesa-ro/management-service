import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { AmbienteFindOneOutput, AmbienteInputRef } from "../../../ambiente/application/dtos";
import {
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoInputRef,
} from "../../../calendario-letivo/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { DisciplinaFindOneOutput, DisciplinaInputRef } from "../../../disciplina/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";
import { TurmaFindOneOutput, TurmaInputRef } from "../../../turma/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioFindOneInput {
  @IsUUID()
  id!: string;
}

export class DiarioFindOneOutput {
  @IsUUID()
  id!: string;

  @IsBoolean()
  ativo!: boolean;

  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutput)
  calendarioLetivo!: CalendarioLetivoFindOneOutput;

  @ValidateNested()
  @Type(() => TurmaFindOneOutput)
  turma!: TurmaFindOneOutput;

  @ValidateNested()
  @Type(() => DisciplinaFindOneOutput)
  disciplina!: DisciplinaFindOneOutput;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutput)
  ambientePadrao!: AmbienteFindOneOutput | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutput)
  imagemCapa!: ImagemFindOneOutput | null;

  @IsDate()
  dateCreated!: Date;

  @IsDate()
  dateUpdated!: Date;

  @IsOptional()
  @IsDate()
  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiarioListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.turma.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.disciplina.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendarioLetivo.id"?: string[];
}

export class DiarioListOutput {
  meta!: PaginationMeta;
  data!: DiarioFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiarioCreateInput {
  @IsBoolean()
  ativo!: boolean;

  @ValidateNested()
  @Type(() => CalendarioLetivoInputRef)
  calendarioLetivo!: CalendarioLetivoInputRef;

  @ValidateNested()
  @Type(() => TurmaInputRef)
  turma!: TurmaInputRef;

  @ValidateNested()
  @Type(() => DisciplinaInputRef)
  disciplina!: DisciplinaInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteInputRef)
  ambientePadrao?: AmbienteInputRef | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

export class DiarioUpdateInput {
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CalendarioLetivoInputRef)
  calendarioLetivo?: CalendarioLetivoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => TurmaInputRef)
  turma?: TurmaInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => DisciplinaInputRef)
  disciplina?: DisciplinaInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteInputRef)
  ambientePadrao?: AmbienteInputRef | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class DiarioInputRef extends ObjectUuidRef {}
