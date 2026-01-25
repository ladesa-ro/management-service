import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { DiarioFindOneOutput, DiarioInputRef } from "../../../diario/application/dtos";
import {
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInputRef,
} from "../../../intervalo-de-tempo/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioPreferenciaAgrupamentoFindOneInput {
  @IsUUID()
  id!: string;
}

export class DiarioPreferenciaAgrupamentoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsDate()
  dataInicio!: Date;

  @IsOptional()
  @IsDate()
  dataFim!: Date | null;

  @IsInt()
  @Min(1)
  @Max(7)
  diaSemanaIso!: number;

  @IsInt()
  @Min(1)
  aulasSeguidas!: number;

  @ValidateNested()
  @Type(() => IntervaloDeTempoFindOneOutput)
  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;

  @ValidateNested()
  @Type(() => DiarioFindOneOutput)
  diario!: DiarioFindOneOutput;

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

export class DiarioPreferenciaAgrupamentoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.diario.id"?: string[];
}

export class DiarioPreferenciaAgrupamentoListOutput {
  meta!: PaginationMeta;
  data!: DiarioPreferenciaAgrupamentoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiarioPreferenciaAgrupamentoCreateInput {
  @IsDate()
  dataInicio!: Date;

  @IsOptional()
  @IsDate()
  dataFim?: Date | null;

  @IsInt()
  @Min(1)
  @Max(7)
  diaSemanaIso!: number;

  @IsInt()
  @Min(1)
  aulasSeguidas!: number;

  @ValidateNested()
  @Type(() => IntervaloDeTempoInputRef)
  intervaloDeTempo!: IntervaloDeTempoInputRef;

  @ValidateNested()
  @Type(() => DiarioInputRef)
  diario!: DiarioInputRef;
}

export class DiarioPreferenciaAgrupamentoUpdateInput {
  @IsOptional()
  @IsDate()
  dataInicio?: Date;

  @IsOptional()
  @IsDate()
  dataFim?: Date | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(7)
  diaSemanaIso?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  aulasSeguidas?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => IntervaloDeTempoInputRef)
  intervaloDeTempo?: IntervaloDeTempoInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => DiarioInputRef)
  diario?: DiarioInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class DiarioPreferenciaAgrupamentoInputRef extends ObjectUuidRef {}
