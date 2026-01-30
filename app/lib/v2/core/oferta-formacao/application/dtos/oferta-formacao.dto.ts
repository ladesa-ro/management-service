import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { ModalidadeFindOneOutput, ModalidadeInputRef } from "../../../modalidade/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class OfertaFormacaoFindOneInput {
  id!: string;
}

export class OfertaFormacaoFindOneOutput {
  id!: string;

  nome!: string;

  slug!: string;

  modalidade!: ModalidadeFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class OfertaFormacaoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.modalidade.id"?: string[];
}

export class OfertaFormacaoListOutput {
  meta!: PaginationMeta;
  data!: OfertaFormacaoFindOneOutput[];
}

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
