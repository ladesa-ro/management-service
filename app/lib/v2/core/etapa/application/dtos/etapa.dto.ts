import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
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

export class EtapaFindOneInput {
  @IsUUID()
  id!: string;
}

export class EtapaFindOneOutput {
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  numero!: number | null;

  @IsDate()
  dataInicio!: Date;

  @IsDate()
  dataTermino!: Date;

  @IsOptional()
  @IsString()
  cor!: string | null;

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

export class EtapaListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.calendario.id"?: string[];
}

export class EtapaListOutput {
  meta!: PaginationMeta;
  data!: EtapaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class EtapaCreateInput {
  @IsOptional()
  @IsInt()
  @Min(1)
  numero?: number | null;

  @IsDate()
  dataInicio!: Date;

  @IsDate()
  dataTermino!: Date;

  @IsOptional()
  @IsString()
  cor?: string | null;

  @ValidateNested()
  @Type(() => CalendarioLetivoInputRef)
  calendario!: CalendarioLetivoInputRef;
}

export class EtapaUpdateInput {
  @IsOptional()
  @IsInt()
  @Min(1)
  numero?: number | null;

  @IsOptional()
  @IsDate()
  dataInicio?: Date;

  @IsOptional()
  @IsDate()
  dataTermino?: Date;

  @IsOptional()
  @IsString()
  cor?: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => CalendarioLetivoInputRef)
  calendario?: CalendarioLetivoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class EtapaInputRef extends ObjectUuidRef {}
