import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from "class-validator";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ArquivoFindOneInput {
  @IsUUID()
  id!: string;
}

export class ArquivoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  mimeType!: string;

  @IsInt()
  @Min(0)
  sizeBytes!: number;

  @IsString()
  @MinLength(1)
  storageType!: string;

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

export class ArquivoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

export class ArquivoListOutput {
  meta!: PaginationMeta;
  data!: ArquivoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ArquivoCreateInput {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(1)
  mimeType!: string;

  @IsInt()
  @Min(0)
  sizeBytes!: number;

  @IsString()
  @MinLength(1)
  storageType!: string;
}

export class ArquivoUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  mimeType?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  storageType?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ArquivoInputRef extends ObjectUuidRef {}
