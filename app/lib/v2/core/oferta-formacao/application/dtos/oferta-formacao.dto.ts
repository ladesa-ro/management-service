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
import { ModalidadeFindOneOutput, ModalidadeInputRef } from "../../../modalidade/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class OfertaFormacaoFindOneInput {
  @IsUUID()
  id!: string;
}

export class OfertaFormacaoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  nome!: string;

  @IsString()
  @MinLength(1)
  slug!: string;

  @ValidateNested()
  @Type(() => ModalidadeFindOneOutput)
  modalidade!: ModalidadeFindOneOutput;

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

export class OfertaFormacaoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.modalidade.id"?: string[];
}

export class OfertaFormacaoListOutput {
  meta!: PaginationMeta;
  data!: OfertaFormacaoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class OfertaFormacaoCreateInput {
  @IsString()
  @MinLength(1)
  nome!: string;

  @IsString()
  @MinLength(1)
  slug!: string;

  @ValidateNested()
  @Type(() => ModalidadeInputRef)
  modalidade!: ModalidadeInputRef;
}

export class OfertaFormacaoUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  slug?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ModalidadeInputRef)
  modalidade?: ModalidadeInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class OfertaFormacaoInputRef extends ObjectUuidRef {}
