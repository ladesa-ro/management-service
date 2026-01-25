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
import { CampusFindOneOutput, CampusInputRef } from "../../../campus/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "../../../imagem/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class BlocoFindOneInput {
  @IsUUID()
  id!: string;
}

export class BlocoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  nome!: string;

  @IsString()
  @MinLength(1)
  codigo!: string;

  @ValidateNested()
  @Type(() => CampusFindOneOutput)
  campus!: CampusFindOneOutput;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemFindOneOutput)
  imagemCapa!: ImagemFindOneOutput | null;

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

export class BlocoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.campus.id"?: string[];
}

export class BlocoListOutput {
  meta!: PaginationMeta;
  data!: BlocoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class BlocoCreateInput {
  @IsString()
  @MinLength(1)
  nome!: string;

  @IsString()
  @MinLength(1)
  codigo!: string;

  @ValidateNested()
  @Type(() => CampusInputRef)
  campus!: CampusInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

export class BlocoUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  codigo?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CampusInputRef)
  campus?: CampusInputRef;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImagemInputRef)
  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class BlocoInputRef extends ObjectUuidRef {}
