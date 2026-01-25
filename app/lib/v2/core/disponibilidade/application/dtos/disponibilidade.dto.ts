import { IsArray, IsDate, IsOptional, IsString, IsUUID } from "class-validator";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DisponibilidadeFindOneInput {
  @IsUUID()
  id!: string;
}

export class DisponibilidadeFindOneOutput {
  @IsUUID()
  id!: string;

  @IsDate()
  dataInicio!: Date;

  @IsOptional()
  @IsDate()
  dataFim!: Date | null;

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

export class DisponibilidadeListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

export class DisponibilidadeListOutput {
  meta!: PaginationMeta;
  data!: DisponibilidadeFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DisponibilidadeCreateInput {
  @IsDate()
  dataInicio!: Date;

  @IsOptional()
  @IsDate()
  dataFim?: Date | null;
}

export class DisponibilidadeUpdateInput {
  @IsOptional()
  @IsDate()
  dataInicio?: Date;

  @IsOptional()
  @IsDate()
  dataFim?: Date | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class DisponibilidadeInputRef extends ObjectUuidRef {}
