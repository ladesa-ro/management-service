import { Type } from "class-transformer";
import { IsArray, IsDate, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import {
  NivelFormacaoFindOneOutput,
  NivelFormacaoInputRef,
} from "../../../nivel-formacao/application/dtos";
import {
  OfertaFormacaoFindOneOutput,
  OfertaFormacaoInputRef,
} from "../../../oferta-formacao/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class OfertaFormacaoNivelFormacaoFindOneInput {
  @IsUUID()
  id!: string;
}

export class OfertaFormacaoNivelFormacaoFindOneOutput {
  @IsUUID()
  id!: string;

  @ValidateNested()
  @Type(() => NivelFormacaoFindOneOutput)
  nivelFormacao!: NivelFormacaoFindOneOutput;

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

export class OfertaFormacaoNivelFormacaoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.nivelFormacao.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ofertaFormacao.id"?: string[];
}

export class OfertaFormacaoNivelFormacaoListOutput {
  meta!: PaginationMeta;
  data!: OfertaFormacaoNivelFormacaoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class OfertaFormacaoNivelFormacaoCreateInput {
  @ValidateNested()
  @Type(() => NivelFormacaoInputRef)
  nivelFormacao!: NivelFormacaoInputRef;

  @ValidateNested()
  @Type(() => OfertaFormacaoInputRef)
  ofertaFormacao!: OfertaFormacaoInputRef;
}

export class OfertaFormacaoNivelFormacaoUpdateInput {
  @IsOptional()
  @ValidateNested()
  @Type(() => NivelFormacaoInputRef)
  nivelFormacao?: NivelFormacaoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => OfertaFormacaoInputRef)
  ofertaFormacao?: OfertaFormacaoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class OfertaFormacaoNivelFormacaoInputRef extends ObjectUuidRef {}
