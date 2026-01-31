import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared/application/dtos";
import type { ScalarDate } from "@/modules/@shared/domain/scalars.types";
import { AmbienteFindOneOutput, AmbienteInputRef } from "@/modules/ambiente";
import { DiarioFindOneOutput, DiarioInputRef } from "@/modules/diario/application/dtos";
import {
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInputRef,
} from "@/modules/intervalo-de-tempo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class AulaFindOneInput extends FindOneInput {}

export class AulaFindOneOutput extends EntityOutput {
  data!: ScalarDate;
  modalidade!: string | null;
  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;
  diario!: DiarioFindOneOutput;
  ambiente!: AmbienteFindOneOutput | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class AulaListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
  "filter.intervaloDeTempo.id"?: IFilterAcceptableValues;
}

export class AulaListOutput extends PaginationResult<AulaFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class AulaCreateInput {
  data!: ScalarDate;
  modalidade?: string | null;
  intervaloDeTempo!: IntervaloDeTempoInputRef;
  diario!: DiarioInputRef;
  ambiente?: AmbienteInputRef | null;
}

export class AulaUpdateInput {
  data?: ScalarDate;
  modalidade?: string | null;
  intervaloDeTempo?: IntervaloDeTempoInputRef;
  diario?: DiarioInputRef;
  ambiente?: AmbienteInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type AulaInputRef = ObjectUuidRef;
