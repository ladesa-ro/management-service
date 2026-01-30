import {
  IdUuid,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
  ScalarDateTimeString,
} from "@/core/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ArquivoFindOneInput {
  id!: IdUuid;

  selection?: string[];
}

export class ArquivoFindOneOutput {
  id!: IdUuid;

  name!: string | null;

  mimeType!: string | null;

  sizeBytes!: number | null;

  storageType!: string;

  dateCreated!: ScalarDateTimeString;

  dateUpdated!: ScalarDateTimeString;

  dateDeleted!: ScalarDateTimeString | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ArquivoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
}

export class ArquivoListOutput extends PaginationResult<ArquivoFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ArquivoCreateInput {
  name?: string | null;

  mimeType?: string | null;

  sizeBytes?: number | null;

  storageType!: string;
}

export class ArquivoUpdateInput {
  name?: string | null;

  mimeType?: string | null;

  sizeBytes?: number | null;

  storageType?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ArquivoInputRef extends ObjectUuidRef {}

// ============================================================================
// GetFile Input
// ============================================================================

export class ArquivoGetFileInput {
  id!: IdUuid;

  acesso?: {
    id?: string;
    nome?: string;
  } | null;
}
