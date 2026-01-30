import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { AmbienteFindOneOutput, AmbienteInputRef } from "@/core/ambiente";
import { CalendarioLetivoFindOneOutput, CalendarioLetivoInputRef } from "@/core/calendario-letivo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EventoFindOneInput {
  id!: IdUuid;
}

export class EventoFindOneOutput {
  id!: IdUuid;

  nome!: string | null;

  rrule!: string;

  cor!: string | null;

  dataInicio!: ScalarDateTimeString | null;

  dataFim!: ScalarDateTimeString | null;

  calendario!: CalendarioLetivoFindOneOutput;

  ambiente!: AmbienteFindOneOutput | null;

  dateCreated!: ScalarDateTimeString;

  dateUpdated!: ScalarDateTimeString;

  dateDeleted!: ScalarDateTimeString | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EventoListInput extends PaginationInput {
  "filter.id"?: IdUuid[];

  "filter.calendario.id"?: IdUuid[];
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

  dataInicio?: ScalarDateTimeString | null;

  dataFim?: ScalarDateTimeString | null;

  calendario!: CalendarioLetivoInputRef;

  ambiente?: AmbienteInputRef | null;
}

export class EventoUpdateInput {
  nome?: string | null;

  rrule?: string;

  cor?: string | null;

  dataInicio?: ScalarDateTimeString | null;

  dataFim?: ScalarDateTimeString | null;

  calendario?: CalendarioLetivoInputRef;

  ambiente?: AmbienteInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export class EventoInputRef extends ObjectUuidRef {}
