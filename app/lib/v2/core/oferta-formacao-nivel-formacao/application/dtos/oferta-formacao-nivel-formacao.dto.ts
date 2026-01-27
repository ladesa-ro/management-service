import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import {
  NivelFormacaoFindOneOutput,
  NivelFormacaoInputRef,
} from "../../../nivel-formacao/application/dtos";
import {
  OfertaFormacaoFindOneOutput,
  OfertaFormacaoInputRef,
} from "../../../oferta-formacao/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class OfertaFormacaoNivelFormacaoFindOneInput {
  id!: string;
}

export class OfertaFormacaoNivelFormacaoFindOneOutput {
  id!: string;

  nivelFormacao!: NivelFormacaoFindOneOutput;

  ofertaFormacao!: OfertaFormacaoFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
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
