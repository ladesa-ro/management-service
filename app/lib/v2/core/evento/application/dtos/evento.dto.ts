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
import { AmbienteFindOneOutput, AmbienteInputRef } from "../../../ambiente/application/dtos";
import {
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoInputRef,
} from "../../../calendario-letivo/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EventoFindOneInput {
  @IsUUID()
  id!: string;
}

export class EventoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsString()
  nome!: string | null;

  @IsString()
  @MinLength(1)
  rrule!: string;

  @IsOptional()
  @IsString()
  cor!: string | null;

  @IsOptional()
  @IsDate()
  data_inicio!: Date | null;

  @IsOptional()
  @IsDate()
  data_fim!: Date | null;

  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutput)
  calendario!: CalendarioLetivoFindOneOutput;

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

export class EventoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.id"?: string[];
}

export class EventoListOutput {
  meta!: PaginationMeta;
  data!: EventoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class EventoCreateInput {
  @IsOptional()
  @IsString()
  nome?: string | null;

  @IsString()
  @MinLength(1)
  rrule!: string;

  @IsOptional()
  @IsString()
  cor?: string | null;

  @IsOptional()
  @IsDate()
  data_inicio?: Date | null;

  @IsOptional()
  @IsDate()
  data_fim?: Date | null;

  @ValidateNested()
  @Type(() => CalendarioLetivoInputRef)
  calendario!: CalendarioLetivoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteInputRef)
  ambiente?: AmbienteInputRef | null;
}

export class EventoUpdateInput {
  @IsOptional()
  @IsString()
  nome?: string | null;

  @IsOptional()
  @IsString()
  @MinLength(1)
  rrule?: string;

  @IsOptional()
  @IsString()
  cor?: string | null;

  @IsOptional()
  @IsDate()
  data_inicio?: Date | null;

  @IsOptional()
  @IsDate()
  data_fim?: Date | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => CalendarioLetivoInputRef)
  calendario?: CalendarioLetivoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteInputRef)
  ambiente?: AmbienteInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class EventoInputRef extends ObjectUuidRef {}
