import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import { NivelFormacaoFindOneOutput, NivelFormacaoInputRef } from "@/core/nivel-formacao";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoInputRef } from "@/core/oferta-formacao";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class OfertaFormacaoNivelFormacaoFindOneInput extends FindOneInput {}

export class OfertaFormacaoNivelFormacaoFindOneOutput extends EntityOutput {
  nivelFormacao!: NivelFormacaoFindOneOutput;
  ofertaFormacao!: OfertaFormacaoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class OfertaFormacaoNivelFormacaoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.nivelFormacao.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}

export class OfertaFormacaoNivelFormacaoListOutput extends PaginationResult<OfertaFormacaoNivelFormacaoFindOneOutput> {}

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

export type OfertaFormacaoNivelFormacaoInputRef = ObjectUuidRef;
