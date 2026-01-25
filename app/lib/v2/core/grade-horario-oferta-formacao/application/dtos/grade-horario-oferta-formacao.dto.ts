import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { CampusFindOneOutput, CampusInputRef } from "../../../campus/application/dtos";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoInputRef } from "../../../oferta-formacao/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoFindOneInput {
  @IsUUID()
  id!: string;
}

export class GradeHorarioOfertaFormacaoFindOneOutput {
  @IsUUID()
  id!: string;

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

export class GradeHorarioOfertaFormacaoListInput extends PaginationInput {
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

export class GradeHorarioOfertaFormacaoListOutput {
  meta!: PaginationMeta;
  data!: GradeHorarioOfertaFormacaoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class GradeHorarioOfertaFormacaoCreateInput {
  @ValidateNested()
  @Type(() => CampusInputRef)
  campus!: CampusInputRef;

  @ValidateNested()
  @Type(() => OfertaFormacaoInputRef)
  ofertaFormacao!: OfertaFormacaoInputRef;
}

export class GradeHorarioOfertaFormacaoUpdateInput {
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

export class GradeHorarioOfertaFormacaoInputRef extends ObjectUuidRef {}
