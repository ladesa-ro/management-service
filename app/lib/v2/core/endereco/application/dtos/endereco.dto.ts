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
import { CidadeFindOneOutput, CidadeInputRef } from "../../../cidade/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EnderecoFindOneInput {
  @IsUUID()
  id!: string;
}

export class EnderecoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  cep!: string;

  @IsString()
  @MinLength(1)
  logradouro!: string;

  @IsInt()
  @Min(0)
  numero!: number;

  @IsString()
  @MinLength(1)
  bairro!: string;

  @IsOptional()
  @IsString()
  complemento!: string | null;

  @IsOptional()
  @IsString()
  pontoReferencia!: string | null;

  @ValidateNested()
  @Type(() => CidadeFindOneOutput)
  cidade!: CidadeFindOneOutput;

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

export class EnderecoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  "filter.cidade.id"?: number[];
}

export class EnderecoListOutput {
  meta!: PaginationMeta;
  data!: EnderecoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class EnderecoCreateInput {
  @IsString()
  @MinLength(1)
  cep!: string;

  @IsString()
  @MinLength(1)
  logradouro!: string;

  @IsInt()
  @Min(0)
  numero!: number;

  @IsString()
  @MinLength(1)
  bairro!: string;

  @IsOptional()
  @IsString()
  complemento?: string | null;

  @IsOptional()
  @IsString()
  pontoReferencia?: string | null;

  @ValidateNested()
  @Type(() => CidadeInputRef)
  cidade!: CidadeInputRef;
}

export class EnderecoUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  cep?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  logradouro?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  numero?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  bairro?: string;

  @IsOptional()
  @IsString()
  complemento?: string | null;

  @IsOptional()
  @IsString()
  pontoReferencia?: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => CidadeInputRef)
  cidade?: CidadeInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class EnderecoInputRef extends ObjectUuidRef {}
