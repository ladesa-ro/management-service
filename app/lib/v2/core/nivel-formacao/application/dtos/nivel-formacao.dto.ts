import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class NivelFormacaoFindOneInput {
  id!: string;
}

export class NivelFormacaoFindOneOutput {
  id!: string;

  slug!: string;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class NivelFormacaoListInput extends PaginationInput {
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
  slug!: string;
}

export class NivelFormacaoUpdateInput {
  slug?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export class NivelFormacaoInputRef extends ObjectUuidRef {}
