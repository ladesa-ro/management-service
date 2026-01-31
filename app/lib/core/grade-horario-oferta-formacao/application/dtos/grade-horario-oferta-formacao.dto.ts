import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import { CampusFindOneOutput, CampusInputRef } from "@/core/campus";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoInputRef } from "@/core/oferta-formacao";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoFindOneInput extends FindOneInput {}

export class GradeHorarioOfertaFormacaoFindOneOutput extends EntityOutput {
  campus!: CampusFindOneOutput;
  ofertaFormacao!: OfertaFormacaoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}

export class GradeHorarioOfertaFormacaoListOutput extends PaginationResult<GradeHorarioOfertaFormacaoFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class GradeHorarioOfertaFormacaoCreateInput {
  campus!: CampusInputRef;
  ofertaFormacao!: OfertaFormacaoInputRef;
}

export class GradeHorarioOfertaFormacaoUpdateInput {
  campus?: CampusInputRef;
  ofertaFormacao?: OfertaFormacaoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export type GradeHorarioOfertaFormacaoInputRef = ObjectUuidRef;
