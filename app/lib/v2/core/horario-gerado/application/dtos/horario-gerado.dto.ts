import { Type } from "class-transformer";
import { IsArray, IsDate, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import {
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoInputRef,
} from "../../../calendario-letivo/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class HorarioGeradoFindOneInput {
  @IsUUID()
  id!: string;
}

export class HorarioGeradoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsString()
  status!: string | null;

  @IsOptional()
  @IsString()
  tipo!: string | null;

  @IsOptional()
  @IsDate()
  dataGeracao!: Date | null;

  @IsOptional()
  @IsDate()
  vigenciaInicio!: Date | null;

  @IsOptional()
  @IsDate()
  vigenciaFim!: Date | null;

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

export class HorarioGeradoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.id"?: string[];
}

export class HorarioGeradoListOutput {
  meta!: PaginationMeta;
  data!: HorarioGeradoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class HorarioGeradoCreateInput {
  @IsOptional()
  @IsString()
  status?: string | null;

  @IsOptional()
  @IsString()
  tipo?: string | null;

  @IsOptional()
  @IsDate()
  dataGeracao?: Date | null;

  @IsOptional()
  @IsDate()
  vigenciaInicio?: Date | null;

  @IsOptional()
  @IsDate()
  vigenciaFim?: Date | null;

  @ValidateNested()
  @Type(() => CalendarioLetivoInputRef)
  calendario!: CalendarioLetivoInputRef;
}

export class HorarioGeradoUpdateInput {
  @IsOptional()
  @IsString()
  status?: string | null;

  @IsOptional()
  @IsString()
  tipo?: string | null;

  @IsOptional()
  @IsDate()
  dataGeracao?: Date | null;

  @IsOptional()
  @IsDate()
  vigenciaInicio?: Date | null;

  @IsOptional()
  @IsDate()
  vigenciaFim?: Date | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => CalendarioLetivoInputRef)
  calendario?: CalendarioLetivoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class HorarioGeradoInputRef extends ObjectUuidRef {}
