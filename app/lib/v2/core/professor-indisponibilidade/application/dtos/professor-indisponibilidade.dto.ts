import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { UsuarioFindOneOutput, UsuarioInputRef } from "../../../usuario/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ProfessorIndisponibilidadeFindOneInput {
  @IsUUID()
  id!: string;
}

export class ProfessorIndisponibilidadeFindOneOutput {
  @IsUUID()
  id!: string;

  @ValidateNested()
  @Type(() => UsuarioFindOneOutput)
  perfil!: UsuarioFindOneOutput;

  @IsInt()
  @Min(0)
  @Max(6)
  diaDaSemana!: number;

  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  horaInicio!: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  horaFim!: string;

  @IsString()
  @MinLength(1)
  motivo!: string;

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

export class ProfessorIndisponibilidadeListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.perfil.id"?: string[];
}

export class ProfessorIndisponibilidadeListOutput {
  meta!: PaginationMeta;
  data!: ProfessorIndisponibilidadeFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ProfessorIndisponibilidadeCreateInput {
  @ValidateNested()
  @Type(() => UsuarioInputRef)
  perfil!: UsuarioInputRef;

  @IsInt()
  @Min(0)
  @Max(6)
  diaDaSemana!: number;

  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  horaInicio!: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  horaFim!: string;

  @IsString()
  @MinLength(1)
  motivo!: string;
}

export class ProfessorIndisponibilidadeUpdateInput {
  @IsOptional()
  @ValidateNested()
  @Type(() => UsuarioInputRef)
  perfil?: UsuarioInputRef;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(6)
  diaDaSemana?: number;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  horaInicio?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/)
  horaFim?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  motivo?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ProfessorIndisponibilidadeInputRef extends ObjectUuidRef {}
