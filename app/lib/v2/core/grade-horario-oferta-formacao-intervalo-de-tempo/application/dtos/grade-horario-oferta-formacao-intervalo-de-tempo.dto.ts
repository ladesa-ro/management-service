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
import { IntervaloDeTempoFindOneOutput, IntervaloDeTempoInputRef } from "../../../intervalo-de-tempo/application/dtos";
import { GradeHorarioOfertaFormacaoFindOneOutput, GradeHorarioOfertaFormacaoInputRef } from "../../../grade-horario-oferta-formacao/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput {
  @IsUUID()
  id!: string;
}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput {
  @IsUUID()
  id!: string;

  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutput)
  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;

  @ValidateNested()
  @Type(() => GradeHorarioOfertaFormacaoFindOneOutput)
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacaoFindOneOutput;

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

export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.gradeHorarioOfertaFormacao.id"?: string[];
}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput {
  meta!: PaginationMeta;
  data!: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput {
  @ValidateNested()
  @Type(() => IntervaloDeTempoInputRef)
  intervaloDeTempo!: IntervaloDeTempoInputRef;

  @ValidateNested()
  @Type(() => GradeHorarioOfertaFormacaoInputRef)
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacaoInputRef;
}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput {
  @IsOptional()
  @ValidateNested()
  @Type(() => IntervaloDeTempoInputRef)
  intervaloDeTempo?: IntervaloDeTempoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => GradeHorarioOfertaFormacaoInputRef)
  gradeHorarioOfertaFormacao?: GradeHorarioOfertaFormacaoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoInputRef extends ObjectUuidRef {}
