import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { AmbienteFindOneOutput, AmbienteInputRef } from "@/core/ambiente";
import { DiarioFindOneOutput, DiarioInputRef } from "@/core/diario/application/dtos";
import {
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInputRef,
} from "@/core/intervalo-de-tempo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class AulaFindOneInput {
  id!: string;
}

export class AulaFindOneOutput {
  id!: string;

  data!: Date;

  modalidade!: string | null;

  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;

  diario!: DiarioFindOneOutput;

  ambiente!: AmbienteFindOneOutput | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class AulaListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.diario.id"?: string[];

  "filter.intervaloDeTempo.id"?: string[];
}

export class AulaListOutput {
  meta!: PaginationMeta;
  data!: AulaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class AulaCreateInput {
  data!: Date;

  modalidade?: string | null;

  intervaloDeTempo!: IntervaloDeTempoInputRef;

  diario!: DiarioInputRef;

  ambiente?: AmbienteInputRef | null;
}

export class AulaUpdateInput {
  data?: Date;

  modalidade?: string | null;

  intervaloDeTempo?: IntervaloDeTempoInputRef;

  diario?: DiarioInputRef;

  ambiente?: AmbienteInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class AulaInputRef extends ObjectUuidRef {}
