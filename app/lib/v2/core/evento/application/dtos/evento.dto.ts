import { AmbienteFindOneOutput, AmbienteInputRef } from "../../../ambiente/application/dtos";
import { CalendarioLetivoFindOneOutput, CalendarioLetivoInputRef, } from "../../../calendario-letivo/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EventoFindOneInput {
  id!: string;
}

export class EventoFindOneOutput {
  id!: string;

  nome!: string | null;

  rrule!: string;

  cor!: string | null;

  data_inicio!: Date | null;

  data_fim!: Date | null;

  calendario!: CalendarioLetivoFindOneOutput;

  ambiente!: AmbienteFindOneOutput | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EventoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.calendario.id"?: string[];
}

export class EventoListOutput {
  meta!: PaginationMeta;
  data!: EventoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class EventoCreateInput {
  nome?: string | null;

  rrule!: string;

  cor?: string | null;

  data_inicio?: Date | null;

  data_fim?: Date | null;

  calendario!: CalendarioLetivoInputRef;

  ambiente?: AmbienteInputRef | null;
}

export class EventoUpdateInput {
  nome?: string | null;

  rrule?: string;

  cor?: string | null;

  data_inicio?: Date | null;

  data_fim?: Date | null;

  calendario?: CalendarioLetivoInputRef;

  ambiente?: AmbienteInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class EventoInputRef extends ObjectUuidRef {}
