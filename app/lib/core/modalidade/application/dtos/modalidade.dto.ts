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

export class ModalidadeFindOneInput {
  id!: IdUuid;

  selection?: string[];
}

export class ModalidadeFindOneOutput {
  id!: IdUuid;

  nome!: string;

  slug!: string;

  dateCreated!: ScalarDateTimeString;

  dateUpdated!: ScalarDateTimeString;

  dateDeleted!: ScalarDateTimeString | null;
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
