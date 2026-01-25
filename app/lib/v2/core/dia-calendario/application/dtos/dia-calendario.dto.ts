import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import {
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoInputRef,
} from "../../../calendario-letivo/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiaCalendarioFindOneInput {
  @IsUUID()
  id!: string;
}

export class DiaCalendarioFindOneOutput {
  @IsUUID()
  id!: string;

  @IsDate()
  data!: Date;

  @IsBoolean()
  diaLetivo!: boolean;

  @IsString()
  feriado!: string;

  @IsBoolean()
  diaPresencial!: boolean;

  @IsString()
  tipo!: string;

  @IsBoolean()
  extraCurricular!: boolean;

  @ValidateNested()
  @Type(() => CalendarioLetivoFindOneOutput)
  calendario!: CalendarioLetivoFindOneOutput;

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

export class DiaCalendarioListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.id"?: string[];
}

export class DiaCalendarioListOutput {
  meta!: PaginationMeta;
  data!: DiaCalendarioFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiaCalendarioCreateInput {
  @IsDate()
  data!: Date;

  @IsBoolean()
  diaLetivo!: boolean;

  @IsString()
  feriado!: string;

  @IsBoolean()
  diaPresencial!: boolean;

  @IsString()
  tipo!: string;

  @IsBoolean()
  extraCurricular!: boolean;

  @ValidateNested()
  @Type(() => CalendarioLetivoInputRef)
  calendario!: CalendarioLetivoInputRef;
}

export class DiaCalendarioUpdateInput {
  @IsOptional()
  @IsDate()
  data?: Date;

  @IsOptional()
  @IsBoolean()
  diaLetivo?: boolean;

  @IsOptional()
  @IsString()
  feriado?: string;

  @IsOptional()
  @IsBoolean()
  diaPresencial?: boolean;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsBoolean()
  extraCurricular?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CalendarioLetivoInputRef)
  calendario?: CalendarioLetivoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class DiaCalendarioInputRef extends ObjectUuidRef {}
