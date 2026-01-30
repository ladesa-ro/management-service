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

export class NivelFormacaoFindOneInput {
  id!: IdUuid;

  selection?: string[];
}

export class NivelFormacaoFindOneOutput {
  id!: IdUuid;

  slug!: string;

  dateCreated!: ScalarDateTimeString;

  dateUpdated!: ScalarDateTimeString;

  dateDeleted!: ScalarDateTimeString | null;
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
