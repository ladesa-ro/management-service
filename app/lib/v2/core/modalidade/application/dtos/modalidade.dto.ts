import { IsArray, IsDate, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ModalidadeFindOneInput {
  @IsUUID()
  id!: string;
}

export class ModalidadeFindOneOutput {
  @IsUUID()
  id!: string;

  @IsString()
  @MinLength(1)
  nome!: string;

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

export class ModalidadeListInput extends PaginationInput {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  "filter.id"?: string[];
}

export class ModalidadeListOutput {
  meta!: PaginationMeta;
  data!: ModalidadeFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ModalidadeCreateInput {
  @IsString()
  @MinLength(1)
  nome!: string;

  @IsString()
  @MinLength(1)
  slug!: string;
}

export class ModalidadeUpdateInput {
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  slug?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ModalidadeInputRef extends ObjectUuidRef {}
