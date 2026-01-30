import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import {
  GradeHorarioOfertaFormacaoFindOneOutput,
  GradeHorarioOfertaFormacaoInputRef,
} from "@/core/grade-horario-oferta-formacao";
import { IntervaloDeTempoFindOneOutput, IntervaloDeTempoInputRef } from "@/core/intervalo-de-tempo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput {
  id!: string;
}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput {
  id!: string;

  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;

  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacaoFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoIntervaloDeTempoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.gradeHorarioOfertaFormacao.id"?: string[];
}

export class GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput {
  meta!: PaginationMeta;
  data!: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput[];
}

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

export class GradeHorarioOfertaFormacaoIntervaloDeTempoInputRef extends ObjectUuidRef {}
