import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ImagemFindOneInput {
  id!: string;
}

export class ImagemFindOneOutput {
  id!: string;

  descricao!: string | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ImagemListInput extends PaginationInput {
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
  descricao?: string | null;
}

export class ImagemUpdateInput {
  descricao?: string | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ImagemInputRef extends ObjectUuidRef {}
