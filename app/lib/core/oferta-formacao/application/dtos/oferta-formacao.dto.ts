import {
  IdUuid,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
  ScalarDateTimeString,
} from "@/core/@shared";
import { ModalidadeFindOneOutput, ModalidadeInputRef } from "@/core/modalidade";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class OfertaFormacaoFindOneInput {
  id!: IdUuid;

  selection?: string[];
}

export class OfertaFormacaoFindOneOutput {
  id!: IdUuid;

  nome!: string;

  slug!: string;

  modalidade!: ModalidadeFindOneOutput;

  dateCreated!: ScalarDateTimeString;

  dateUpdated!: ScalarDateTimeString;

  dateDeleted!: ScalarDateTimeString | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class OfertaFormacaoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;

  "filter.modalidade.id"?: IFilterAcceptableValues;
}

export class OfertaFormacaoListOutput extends PaginationResult<OfertaFormacaoFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class OfertaFormacaoCreateInput {
  nome!: string;

  slug!: string;

  modalidade!: ModalidadeInputRef;
}

export class OfertaFormacaoUpdateInput {
  nome?: string;

  slug?: string;

  modalidade?: ModalidadeInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class OfertaFormacaoInputRef extends ObjectUuidRef {}
