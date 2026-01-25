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
import { CampusFindOneOutput, CampusInputRef } from "../../../campus/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import {
  OfertaFormacaoFindOneOutput,
  OfertaFormacaoInputRef,
} from "../../../oferta-formacao/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CalendarioLetivoFindOneInput {
  @IsUUID()
  id!: string;
}

export class CalendarioLetivoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  nome!: string;

  @IsInt()
  @Min(1900)
  ano!: number;

  @ValidateNested()
  @Type(() => CampusFindOneOutput)
  campus!: CampusFindOneOutput;

  @ValidateNested()
  @Type(() => OfertaFormacaoFindOneOutput)
  ofertaFormacao!: OfertaFormacaoFindOneOutput;

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

export class CalendarioLetivoListInput extends PaginationInput {
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

export class CalendarioLetivoListOutput {
  meta!: PaginationMeta;
  data!: CalendarioLetivoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class CalendarioLetivoCreateInput {
  @IsString()
  @MinLength(1)
  nome!: string;

  @IsInt()
  @Min(1900)
  ano!: number;

  @ValidateNested()
  @Type(() => CampusInputRef)
  campus!: CampusInputRef;

  @ValidateNested()
  @Type(() => OfertaFormacaoInputRef)
  ofertaFormacao!: OfertaFormacaoInputRef;
}

export class CalendarioLetivoUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;

  @IsOptional()
  @IsInt()
  @Min(1900)
  ano?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CampusInputRef)
  campus?: CampusInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => OfertaFormacaoInputRef)
  ofertaFormacao?: OfertaFormacaoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class CalendarioLetivoInputRef extends ObjectUuidRef {}
