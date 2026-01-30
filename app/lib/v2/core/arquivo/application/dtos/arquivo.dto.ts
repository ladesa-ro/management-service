import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ArquivoFindOneInput {
  id!: string;
}

export class ArquivoFindOneOutput {
  id!: string;

  name!: string;

  mimeType!: string;

  sizeBytes!: number;

  storageType!: string;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ArquivoListInput extends PaginationInput {
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
  name!: string;

  mimeType!: string;

  sizeBytes!: number;

  storageType!: string;
}

export class ArquivoUpdateInput {
  name?: string;

  mimeType?: string;

  sizeBytes?: number;

  storageType?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ArquivoInputRef extends ObjectUuidRef {}
