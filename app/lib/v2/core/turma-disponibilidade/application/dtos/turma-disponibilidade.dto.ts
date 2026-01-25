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
import { TurmaFindOneOutput, TurmaInputRef } from "../../../turma/application/dtos";
import { DisponibilidadeFindOneOutput, DisponibilidadeInputRef } from "../../../disponibilidade/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class TurmaDisponibilidadeFindOneInput {
  @IsUUID()
  id!: string;
}

export class TurmaDisponibilidadeFindOneOutput {
  @IsUUID()
  id!: string;

  @ValidateNested()
  @Type(() => TurmaFindOneOutput)
  turma!: TurmaFindOneOutput;

  @ValidateNested()
  @Type(() => DisponibilidadeFindOneOutput)
  disponibilidade!: DisponibilidadeFindOneOutput;

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

export class TurmaDisponibilidadeListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.turma.id"?: string[];
}

export class TurmaDisponibilidadeListOutput {
  meta!: PaginationMeta;
  data!: TurmaDisponibilidadeFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class TurmaDisponibilidadeCreateInput {
  @ValidateNested()
  @Type(() => TurmaInputRef)
  turma!: TurmaInputRef;

  @ValidateNested()
  @Type(() => DisponibilidadeInputRef)
  disponibilidade!: DisponibilidadeInputRef;
}

export class TurmaDisponibilidadeUpdateInput {
  @IsOptional()
  @ValidateNested()
  @Type(() => TurmaInputRef)
  turma?: TurmaInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => DisponibilidadeInputRef)
  disponibilidade?: DisponibilidadeInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class TurmaDisponibilidadeInputRef extends ObjectUuidRef {}
