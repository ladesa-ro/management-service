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
import { DiarioProfessorFindOneOutput, DiarioProfessorInputRef } from "../../../diario-professor/application/dtos";
import { HorarioGeradoFindOneOutput, HorarioGeradoInputRef } from "../../../horario-gerado/application/dtos";
import { IntervaloDeTempoFindOneOutput, IntervaloDeTempoInputRef } from "../../../intervalo-de-tempo/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class HorarioGeradoAulaFindOneInput {
  @IsUUID()
  id!: string;
}

export class HorarioGeradoAulaFindOneOutput {
  @IsUUID()
  id!: string;

  @IsDate()
  data!: Date;

  @ValidateNested()
  @Type(() => DiarioProfessorFindOneOutput)
  diarioProfessor!: DiarioProfessorFindOneOutput;

  @ValidateNested()
  @Type(() => HorarioGeradoFindOneOutput)
  horarioGerado!: HorarioGeradoFindOneOutput;

  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutput)
  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;

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

export class HorarioGeradoAulaListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.horarioGerado.id"?: string[];
}

export class HorarioGeradoAulaListOutput {
  meta!: PaginationMeta;
  data!: HorarioGeradoAulaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class HorarioGeradoAulaCreateInput {
  @IsDate()
  data!: Date;

  @ValidateNested()
  @Type(() => DiarioProfessorInputRef)
  diarioProfessor!: DiarioProfessorInputRef;

  @ValidateNested()
  @Type(() => HorarioGeradoInputRef)
  horarioGerado!: HorarioGeradoInputRef;

  @ValidateNested()
  @Type(() => IntervaloDeTempoInputRef)
  intervaloDeTempo!: IntervaloDeTempoInputRef;
}

export class HorarioGeradoAulaUpdateInput {
  @IsOptional()
  @IsDate()
  data?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => DiarioProfessorInputRef)
  diarioProfessor?: DiarioProfessorInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => HorarioGeradoInputRef)
  horarioGerado?: HorarioGeradoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => IntervaloDeTempoInputRef)
  intervaloDeTempo?: IntervaloDeTempoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class HorarioGeradoAulaInputRef extends ObjectUuidRef {}
