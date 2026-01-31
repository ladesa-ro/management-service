import {
  DatedOutput,
  FindOneInput,
  IdUuid,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class NivelFormacaoFindOneInput extends FindOneInput {}

export class NivelFormacaoFindOneOutput extends DatedOutput {
  id!: IdUuid;

  slug!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class NivelFormacaoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
}

export class NivelFormacaoListOutput extends PaginationResult<NivelFormacaoFindOneOutput> {}

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
