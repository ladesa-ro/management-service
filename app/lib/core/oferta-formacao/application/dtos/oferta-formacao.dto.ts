import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import { ModalidadeFindOneOutput, ModalidadeInputRef } from "@/core/modalidade";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class OfertaFormacaoFindOneInput extends FindOneInput {}

export class OfertaFormacaoFindOneOutput extends EntityOutput {
  nome!: string;
  slug!: string;
  modalidade!: ModalidadeFindOneOutput;
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

export type OfertaFormacaoInputRef = ObjectUuidRef;
