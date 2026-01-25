import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { AmbienteFindOneOutput, AmbienteInputRef } from "../../../ambiente/application/dtos";
import { UsuarioFindOneOutput, UsuarioInputRef } from "../../../usuario/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ReservaFindOneInput {
  @IsUUID()
  id!: string;
}

export class ReservaFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  situacao!: string;

  @IsOptional()
  @IsString()
  motivo!: string | null;

  @IsOptional()
  @IsString()
  tipo!: string | null;

  @IsString()
  @MinLength(1)
  rrule!: string;

  @ValidateNested()
  @Type(() => AmbienteFindOneOutput)
  ambiente!: AmbienteFindOneOutput;

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

export class ReservaListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.ambiente.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.usuario.id"?: string[];
}

export class ReservaListOutput {
  meta!: PaginationMeta;
  data!: ReservaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ReservaCreateInput {
  @IsString()
  situacao!: string;

  @IsOptional()
  @IsString()
  motivo?: string | null;

  @IsOptional()
  @IsString()
  tipo?: string | null;

  @IsString()
  @MinLength(1)
  rrule!: string;

  @ValidateNested()
  @Type(() => AmbienteInputRef)
  ambiente!: AmbienteInputRef;

  @ValidateNested()
  @Type(() => UsuarioInputRef)
  usuario!: UsuarioInputRef;
}

export class ReservaUpdateInput {
  @IsOptional()
  @IsString()
  situacao?: string;

  @IsOptional()
  @IsString()
  motivo?: string | null;

  @IsOptional()
  @IsString()
  tipo?: string | null;

  @IsOptional()
  @IsString()
  @MinLength(1)
  rrule?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AmbienteInputRef)
  ambiente?: AmbienteInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => UsuarioInputRef)
  usuario?: UsuarioInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ReservaInputRef extends ObjectUuidRef {}
