import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class UsuarioFindOneInput {
  @IsUUID()
  id!: string;
}

export class UsuarioFindOneOutput {
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  nome!: string | null;

  @IsOptional()
  @IsString()
  @MinLength(1)
  matriculaSiape!: string | null;

  @IsOptional()
  @IsEmail()
  email!: string | null;

  @IsBoolean()
  isSuperUser!: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutput)
  imagemCapa!: ImagemFindOneOutput | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutput)
  imagemPerfil!: ImagemFindOneOutput | null;

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

export class UsuarioListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

export class UsuarioListOutput {
  meta!: PaginationMeta;
  data!: UsuarioFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class UsuarioCreateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string | null;

  @IsOptional()
  @IsString()
  @MinLength(1)
  matriculaSiape?: string | null;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemPerfil?: ImagemInputRef | null;
}

export class UsuarioUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string | null;

  @IsOptional()
  @IsString()
  @MinLength(1)
  matriculaSiape?: string | null;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemPerfil?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class UsuarioInputRef extends ObjectUuidRef {}
