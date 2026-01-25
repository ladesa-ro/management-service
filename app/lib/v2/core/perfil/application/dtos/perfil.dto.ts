import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { CampusFindOneOutput, CampusInputRef } from "../../../campus/application/dtos";
import { UsuarioFindOneOutput, UsuarioInputRef } from "../../../usuario/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class PerfilFindOneInput {
  @IsUUID()
  id!: string;
}

export class PerfilFindOneOutput {
  @IsUUID()
  id!: string;

  @IsBoolean()
  ativo!: boolean;

  @IsString()
  cargo!: string;

  @ValidateNested()
  @Type(() => CampusFindOneOutput)
  campus!: CampusFindOneOutput;

  @ValidateNested()
  @Type(() => UsuarioFindOneOutput)
  usuario!: UsuarioFindOneOutput;

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

export class PerfilListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.campus.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.usuario.id"?: string[];
}

export class PerfilListOutput {
  meta!: PaginationMeta;
  data!: PerfilFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class PerfilSetVinculosInput {
  @IsArray()
  @IsString({ each: true })
  cargos!: string[];

  @ValidateNested()
  @Type(() => CampusInputRef)
  campus!: CampusInputRef;

  @ValidateNested()
  @Type(() => UsuarioInputRef)
  usuario!: UsuarioInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class PerfilInputRef extends ObjectUuidRef {}
