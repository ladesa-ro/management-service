import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ModalidadeFindOneInput {
  id!: string;
}

export class ModalidadeFindOneOutput {
  id!: string;

  nome!: string;

  slug!: string;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ModalidadeListInput extends PaginationInput {
  "filter.id"?: string[];
}

export class ModalidadeListOutput {
  meta!: PaginationMeta;
  data!: ModalidadeFindOneOutput[];
}

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
