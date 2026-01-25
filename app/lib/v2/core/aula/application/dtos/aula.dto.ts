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
import { DiarioFindOneOutput, DiarioInputRef } from "../../../diario/application/dtos";
import { AmbienteFindOneOutput, AmbienteInputRef } from "../../../ambiente/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class AulaFindOneInput {
  @IsUUID()
  id!: string;
}

export class AulaFindOneOutput {
  @IsUUID()
  id!: string;

  @IsDate()
  data!: Date;

  @IsOptional()
  @IsString()
  modalidade!: string | null;

  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutput)
  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;

  @ValidateNested()
  @Type(() => DiarioFindOneOutput)
  diario!: DiarioFindOneOutput;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteFindOneOutput)
  ambiente!: AmbienteFindOneOutput | null;

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

export class AulaListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.diario.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.intervaloDeTempo.id"?: string[];
}

export class AulaListOutput {
  meta!: PaginationMeta;
  data!: AulaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class AulaCreateInput {
  @IsDate()
  data!: Date;

  @IsOptional()
  @IsString()
  modalidade?: string | null;

  @ValidateNested()
  @Type(() => IntervaloDeTempoInputRef)
  intervaloDeTempo!: IntervaloDeTempoInputRef;

  @ValidateNested()
  @Type(() => DiarioInputRef)
  diario!: DiarioInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteInputRef)
  ambiente?: AmbienteInputRef | null;
}

export class AulaUpdateInput {
  @IsOptional()
  @IsDate()
  data?: Date;

  @IsOptional()
  @IsString()
  modalidade?: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => IntervaloDeTempoInputRef)
  intervaloDeTempo?: IntervaloDeTempoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => DiarioInputRef)
  diario?: DiarioInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteInputRef)
  ambiente?: AmbienteInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class AulaInputRef extends ObjectUuidRef {}
