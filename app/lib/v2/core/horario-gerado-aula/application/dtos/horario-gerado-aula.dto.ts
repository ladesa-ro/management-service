import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import {
  DiarioProfessorFindOneOutput,
  DiarioProfessorInputRef,
} from "../../../diario-professor/application/dtos";
import {
  HorarioGeradoFindOneOutput,
  HorarioGeradoInputRef,
} from "../../../horario-gerado/application/dtos";
import {
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInputRef,
} from "../../../intervalo-de-tempo/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class HorarioGeradoAulaFindOneInput {
  id!: string;
}

export class HorarioGeradoAulaFindOneOutput {
  id!: string;

  data!: Date;

  diarioProfessor!: DiarioProfessorFindOneOutput;

  horarioGerado!: HorarioGeradoFindOneOutput;

  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class HorarioGeradoAulaListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.horarioGerado.id"?: string[];
}

export class HorarioGeradoAulaListOutput {
  meta!: PaginationMeta;
  data!: HorarioGeradoAulaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class HorarioGeradoAulaCreateInput {
  data!: Date;

  diarioProfessor!: DiarioProfessorInputRef;

  horarioGerado!: HorarioGeradoInputRef;

  intervaloDeTempo!: IntervaloDeTempoInputRef;
}

export class HorarioGeradoAulaUpdateInput {
  data?: Date;

  diarioProfessor?: DiarioProfessorInputRef;

  horarioGerado?: HorarioGeradoInputRef;

  intervaloDeTempo?: IntervaloDeTempoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class HorarioGeradoAulaInputRef extends ObjectUuidRef {}
