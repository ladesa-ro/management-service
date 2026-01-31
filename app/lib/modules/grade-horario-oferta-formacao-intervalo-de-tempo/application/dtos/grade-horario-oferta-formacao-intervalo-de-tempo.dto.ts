import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared";
import {
  GradeHorarioOfertaFormacaoFindOneOutput,
  GradeHorarioOfertaFormacaoInputRef,
} from "@/modules/grade-horario-oferta-formacao";
import {
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInputRef,
} from "@/modules/intervalo-de-tempo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput extends FindOneInput {}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput extends EntityOutput {
  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacaoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.gradeHorarioOfertaFormacao.id"?: IFilterAcceptableValues;
}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput extends PaginationResult<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput {
  intervaloDeTempo!: IntervaloDeTempoInputRef;
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacaoInputRef;
}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput {
  intervaloDeTempo?: IntervaloDeTempoInputRef;
  gradeHorarioOfertaFormacao?: GradeHorarioOfertaFormacaoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export type GradeHorarioOfertaFormacaoIntervaloDeTempoInputRef = ObjectUuidRef;
