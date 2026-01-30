import {
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared/application/dtos";
import { CampusFindOneOutput, CampusInputRef } from "@/core/campus";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoInputRef } from "@/core/oferta-formacao";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoFindOneInput {
  id!: string;
}

export class GradeHorarioOfertaFormacaoFindOneOutput {
  id!: string;

  campus!: CampusFindOneOutput;

  ofertaFormacao!: OfertaFormacaoFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
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

export class GradeHorarioOfertaFormacaoInputRef extends ObjectUuidRef {}
