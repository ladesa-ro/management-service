import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
  ScalarDate,
} from "@/core/@shared";
import {
  DiarioProfessorFindOneOutput,
  DiarioProfessorInputRef,
} from "@/core/diario-professor/application/dtos";
import { HorarioGeradoFindOneOutput, HorarioGeradoInputRef } from "@/core/horario-gerado";
import { IntervaloDeTempoFindOneOutput, IntervaloDeTempoInputRef } from "@/core/intervalo-de-tempo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class HorarioGeradoAulaFindOneInput extends FindOneInput {}

export class HorarioGeradoAulaFindOneOutput extends EntityOutput {
  data!: ScalarDate;
  diarioProfessor!: DiarioProfessorFindOneOutput;
  horarioGerado!: HorarioGeradoFindOneOutput;
  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class HorarioGeradoAulaListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.horarioGerado.id"?: IFilterAcceptableValues;
}

export class HorarioGeradoAulaListOutput extends PaginationResult<HorarioGeradoAulaFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class HorarioGeradoAulaCreateInput {
  data!: ScalarDate;
  diarioProfessor!: DiarioProfessorInputRef;
  horarioGerado!: HorarioGeradoInputRef;
  intervaloDeTempo!: IntervaloDeTempoInputRef;
}

export class HorarioGeradoAulaUpdateInput {
  data?: ScalarDate;
  diarioProfessor?: DiarioProfessorInputRef;
  horarioGerado?: HorarioGeradoInputRef;
  intervaloDeTempo?: IntervaloDeTempoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export type HorarioGeradoAulaInputRef = ObjectUuidRef;
