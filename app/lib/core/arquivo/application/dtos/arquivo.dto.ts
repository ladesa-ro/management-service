import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import type { IdUuid } from "@/core/@shared/domain/scalars.types";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ArquivoFindOneInput extends FindOneInput {}

export class ArquivoFindOneOutput extends EntityOutput {
  name!: string | null;
  mimeType!: string | null;
  sizeBytes!: number | null;
  storageType!: string;
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

export type ArquivoInputRef = ObjectUuidRef;

// ============================================================================
// GetFile Input
// ============================================================================

export class ArquivoGetFileInput {
  id!: IdUuid;
  acesso?: { id?: string; nome?: string } | null;
}
