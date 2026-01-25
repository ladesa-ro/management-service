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
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { DiarioFindOneOutput, DiarioInputRef } from "../../../diario/application/dtos";
import { PerfilFindOneOutput, PerfilInputRef } from "../../../perfil/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioProfessorFindOneInput {
  @IsUUID()
  id!: string;
}

export class DiarioProfessorFindOneOutput {
  @IsUUID()
  id!: string;

  @IsBoolean()
  situacao!: boolean;

  @ValidateNested()
  @Type(() => DiarioFindOneOutput)
  diario!: DiarioFindOneOutput;

  @ValidateNested()
  @Type(() => PerfilFindOneOutput)
  perfil!: PerfilFindOneOutput;

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

export class DiarioProfessorListInput extends PaginationInput {
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
  "filter.perfil.id"?: string[];
}

export class DiarioProfessorListOutput {
  meta!: PaginationMeta;
  data!: DiarioProfessorFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiarioProfessorCreateInput {
  @IsBoolean()
  situacao!: boolean;

  @ValidateNested()
  @Type(() => DiarioInputRef)
  diario!: DiarioInputRef;

  @ValidateNested()
  @Type(() => PerfilInputRef)
  perfil!: PerfilInputRef;
}

export class DiarioProfessorUpdateInput {
  @IsOptional()
  @IsBoolean()
  situacao?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => DiarioInputRef)
  diario?: DiarioInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => PerfilInputRef)
  perfil?: PerfilInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class DiarioProfessorInputRef extends ObjectUuidRef {}
