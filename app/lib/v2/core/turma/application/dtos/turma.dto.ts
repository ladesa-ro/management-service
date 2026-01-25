import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import { AmbienteFindOneOutput, AmbienteInputRef } from "../../../ambiente/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { CursoFindOneOutput, CursoInputRef } from "../../../curso/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class TurmaFindOneInput {
  @IsUUID()
  id!: string;
}

export class TurmaFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  periodo!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutput)
  ambientePadraoAula!: AmbienteFindOneOutput | null;

  @ValidateNested()
  @Type(() => CursoFindOneOutput)
  curso!: CursoFindOneOutput;

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

export class TurmaListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.curso.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.curso.campus.id"?: string[];
}

export class TurmaListOutput {
  meta!: PaginationMeta;
  data!: TurmaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class TurmaCreateInput {
  @IsString()
  @MinLength(1)
  periodo!: string;

  @ValidateNested()
  @Type(() => CursoInputRef)
  curso!: CursoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteInputRef)
  ambientePadraoAula?: AmbienteInputRef | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

export class TurmaUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  periodo?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CursoInputRef)
  curso?: CursoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteInputRef)
  ambientePadraoAula?: AmbienteInputRef | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class TurmaInputRef extends ObjectUuidRef {}
