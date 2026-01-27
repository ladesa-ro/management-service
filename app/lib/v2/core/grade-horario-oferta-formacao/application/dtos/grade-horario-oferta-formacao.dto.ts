import { CampusFindOneOutput, CampusInputRef } from "../../../campus/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import {
  OfertaFormacaoFindOneOutput,
  OfertaFormacaoInputRef,
} from "../../../oferta-formacao/application/dtos";

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
  "filter.id"?: string[];

  "filter.campus.id"?: string[];

  "filter.ofertaFormacao.id"?: string[];
}

export class GradeHorarioOfertaFormacaoListOutput {
  meta!: PaginationMeta;
  data!: GradeHorarioOfertaFormacaoFindOneOutput[];
}

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
