import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class NivelFormacaoFindOneInput {
  @IsUUID()
  id!: string;
}

export class NivelFormacaoFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  slug!: string;

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

export class NivelFormacaoListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

export class NivelFormacaoListOutput {
  meta!: PaginationMeta;
  data!: NivelFormacaoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class NivelFormacaoCreateInput {
  @IsString()
  @MinLength(1)
  slug!: string;
}

export class NivelFormacaoUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  slug?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export class NivelFormacaoInputRef extends ObjectUuidRef {}
