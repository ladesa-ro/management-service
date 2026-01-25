import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ImagemFindOneInput {
  @IsUUID()
  id!: string;
}

export class ImagemFindOneOutput {
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsString()
  descricao!: string | null;

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

export class ImagemListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

export class ImagemListOutput {
  meta!: PaginationMeta;
  data!: ImagemFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ImagemCreateInput {
  @IsOptional()
  @IsString()
  descricao?: string | null;
}

export class ImagemUpdateInput {
  @IsOptional()
  @IsString()
  descricao?: string | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ImagemInputRef extends ObjectUuidRef {}
