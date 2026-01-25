import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DisciplinaFindOneInput {
  @IsUUID()
  id!: string;
}

export class DisciplinaFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  nome!: string;

  @IsString()
  @MinLength(1)
  nomeAbreviado!: string;

  @IsInt()
  @Min(1)
  cargaHoraria!: number;

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

export class DisciplinaListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

export class DisciplinaListOutput {
  meta!: PaginationMeta;
  data!: DisciplinaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DisciplinaCreateInput {
  @IsString()
  @MinLength(1)
  nome!: string;

  @IsString()
  @MinLength(1)
  nomeAbreviado!: string;

  @IsInt()
  @Min(1)
  cargaHoraria!: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

export class DisciplinaUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  nomeAbreviado?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  cargaHoraria?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class DisciplinaInputRef extends ObjectUuidRef {}
