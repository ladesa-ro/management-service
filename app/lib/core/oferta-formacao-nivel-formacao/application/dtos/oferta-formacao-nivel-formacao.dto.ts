import {
  IdUuid,
  ObjectUuidRef,
  PaginationInput,
  PaginationMeta,
  ScalarDateTimeString,
} from "@/core/@shared";
import {
  NivelFormacaoFindOneOutput,
  NivelFormacaoInputRef,
} from "@/core/nivel-formacao";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoInputRef } from "@/core/oferta-formacao";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class OfertaFormacaoNivelFormacaoFindOneInput {
  id!: IdUuid;
}

export class OfertaFormacaoNivelFormacaoFindOneOutput {
  id!: IdUuid;

  nivelFormacao!: NivelFormacaoFindOneOutput;

  ofertaFormacao!: OfertaFormacaoFindOneOutput;

  dateCreated!: ScalarDateTimeString;

  dateUpdated!: ScalarDateTimeString;

  dateDeleted!: ScalarDateTimeString | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class OfertaFormacaoNivelFormacaoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.nivelFormacao.id"?: string[];

  "filter.ofertaFormacao.id"?: string[];
}

export class OfertaFormacaoNivelFormacaoListOutput {
  meta!: PaginationMeta;
  data!: OfertaFormacaoNivelFormacaoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class OfertaFormacaoNivelFormacaoCreateInput {
  nivelFormacao!: NivelFormacaoInputRef;

  ofertaFormacao!: OfertaFormacaoInputRef;
}

export class OfertaFormacaoNivelFormacaoUpdateInput {
  nivelFormacao?: NivelFormacaoInputRef;

  ofertaFormacao?: OfertaFormacaoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class OfertaFormacaoNivelFormacaoInputRef extends ObjectUuidRef {}
