import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";
import { ArquivoFindOneOutput, ArquivoInputRef } from "../../../arquivo/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ImagemArquivoFindOneInput {
  @IsUUID()
  id!: string;
}

export class ImagemArquivoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsInt()
  @Min(1)
  largura!: number;

  @IsInt()
  @Min(1)
  altura!: number;

  @IsString()
  @MinLength(1)
  formato!: string;

  @IsString()
  @MinLength(1)
  mimeType!: string;

  @ValidateNested()
  @Type(() => ImagemFindOneOutput)
  imagem!: ImagemFindOneOutput;

  @ValidateNested()
  @Type(() => ArquivoFindOneOutput)
  arquivo!: ArquivoFindOneOutput;

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

export class ImagemArquivoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.imagem.id"?: string[];
}

export class ImagemArquivoListOutput {
  meta!: PaginationMeta;
  data!: ImagemArquivoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ImagemArquivoCreateInput {
  @IsInt()
  @Min(1)
  largura!: number;

  @IsInt()
  @Min(1)
  altura!: number;

  @IsString()
  @MinLength(1)
  formato!: string;

  @IsString()
  @MinLength(1)
  mimeType!: string;

  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagem!: ImagemInputRef;

  @ValidateNested()
  @Type(() => ArquivoInputRef)
  arquivo!: ArquivoInputRef;
}

export class ImagemArquivoUpdateInput {
  @IsOptional()
  @IsInt()
  @Min(1)
  largura?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  altura?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  formato?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  mimeType?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagem?: ImagemInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => ArquivoInputRef)
  arquivo?: ArquivoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ImagemArquivoInputRef extends ObjectUuidRef {}
