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

export class ModalidadeFindOneInput extends FindOneInput {}

export class ModalidadeFindOneOutput extends DatedOutput {
  id!: IdUuid;

  nome!: string;

  slug!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ModalidadeListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
}

export class ModalidadeListOutput extends PaginationResult<ModalidadeFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ModalidadeCreateInput {
  nome!: string;

  slug!: string;
}

export class ModalidadeUpdateInput {
  nome?: string;

  slug?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ModalidadeInputRef extends ObjectUuidRef {}
