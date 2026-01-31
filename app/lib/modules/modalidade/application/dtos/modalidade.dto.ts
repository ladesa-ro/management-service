import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ModalidadeFindOneInput extends FindOneInput {}

export class ModalidadeFindOneOutput extends EntityOutput {
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

export type ModalidadeInputRef = ObjectUuidRef;
