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
import { BlocoFindOneOutput, BlocoInputRef } from "../../../bloco/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class AmbienteFindOneInput {
  @IsUUID()
  id!: string;
}

export class AmbienteFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  nome!: string;

  @IsOptional()
  @IsString()
  descricao!: string | null;

  @IsString()
  @MinLength(1)
  codigo!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  capacidade!: number | null;

  @IsOptional()
  @IsString()
  tipo!: string | null;

  @ValidateNested()
  @Type(() => BlocoFindOneOutput)
  bloco!: BlocoFindOneOutput;

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

export class AmbienteListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.bloco.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.bloco.campus.id"?: string[];
}

export class AmbienteListOutput {
  meta!: PaginationMeta;
  data!: AmbienteFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class AmbienteCreateInput {
  @IsString()
  @MinLength(1)
  nome!: string;

  @IsOptional()
  @IsString()
  descricao?: string | null;

  @IsString()
  @MinLength(1)
  codigo!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  capacidade?: number | null;

  @IsOptional()
  @IsString()
  tipo?: string | null;

  @ValidateNested()
  @Type(() => BlocoInputRef)
  bloco!: BlocoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

export class AmbienteUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string | null;

  @IsOptional()
  @IsString()
  @MinLength(1)
  codigo?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  capacidade?: number | null;

  @IsOptional()
  @IsString()
  tipo?: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => BlocoInputRef)
  bloco?: BlocoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class AmbienteInputRef extends ObjectUuidRef {}
