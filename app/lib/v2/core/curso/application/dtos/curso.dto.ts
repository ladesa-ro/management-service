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
import { CampusFindOneOutput, CampusInputRef } from "../../../campus/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";
import {
  OfertaFormacaoFindOneOutput,
  OfertaFormacaoInputRef,
} from "../../../oferta-formacao/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CursoFindOneInput {
  @IsUUID()
  id!: string;
}

export class CursoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  nome!: string;

  @IsString()
  @MinLength(1)
  nomeAbreviado!: string;

  @ValidateNested()
  @Type(() => CampusFindOneOutput)
  campus!: CampusFindOneOutput;

  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutput)
  ofertaFormacao!: OfertaFormacaoFindOneOutput;

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

export class CursoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.campus.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ofertaFormacao.id"?: string[];
}

export class CursoListOutput {
  meta!: PaginationMeta;
  data!: CursoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class CursoCreateInput {
  @IsString()
  @MinLength(1)
  nome!: string;

  @IsString()
  @MinLength(1)
  nomeAbreviado!: string;

  @ValidateNested()
  @Type(() => CampusInputRef)
  campus!: CampusInputRef;

  @ValidateNested()
  @Type(() => OfertaFormacaoInputRef)
  ofertaFormacao!: OfertaFormacaoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

export class CursoUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  nomeAbreviado?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CampusInputRef)
  campus?: CampusInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => OfertaFormacaoInputRef)
  ofertaFormacao?: OfertaFormacaoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class CursoInputRef extends ObjectUuidRef {}
