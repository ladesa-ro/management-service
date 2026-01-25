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
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import {
  EnderecoCreateInput,
  EnderecoFindOneOutput,
  EnderecoUpdateInput,
} from "../../../endereco/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CampusFindOneInput {
  @IsUUID()
  id!: string;
}

export class CampusFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  nomeFantasia!: string;

  @IsString()
  @MinLength(1)
  razaoSocial!: string;

  @IsString()
  @MinLength(1)
  apelido!: string;

  @IsString()
  @MinLength(1)
  cnpj!: string;

  @ValidateNested()
  @Type(() => EnderecoFindOneOutput)
  endereco!: EnderecoFindOneOutput;

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

export class CampusListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

export class CampusListOutput {
  meta!: PaginationMeta;
  data!: CampusFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class CampusCreateInput {
  @IsString()
  @MinLength(1)
  nomeFantasia!: string;

  @IsString()
  @MinLength(1)
  razaoSocial!: string;

  @IsString()
  @MinLength(1)
  apelido!: string;

  @IsString()
  @MinLength(1)
  cnpj!: string;

  @ValidateNested()
  @Type(() => EnderecoCreateInput)
  endereco!: EnderecoCreateInput;
}

export class CampusUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nomeFantasia?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  razaoSocial?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  apelido?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  cnpj?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => EnderecoUpdateInput)
  endereco?: EnderecoUpdateInput;
}

// ============================================================================
// Input Ref
// ============================================================================

export class CampusInputRef extends ObjectUuidRef {}
