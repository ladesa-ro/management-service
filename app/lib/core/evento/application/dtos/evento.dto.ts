import type { ScalarDateTimeString } from "@/core/@shared";
import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared/application/dtos";
import { AmbienteFindOneOutput, AmbienteInputRef } from "@/core/ambiente";
import { CalendarioLetivoFindOneOutput, CalendarioLetivoInputRef } from "@/core/calendario-letivo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EventoFindOneInput extends FindOneInput {}

export class EventoFindOneOutput extends EntityOutput {
  nome!: string | null;
  rrule!: string;
  cor!: string | null;
  dataInicio!: ScalarDateTimeString | null;
  dataFim!: ScalarDateTimeString | null;
  calendario!: CalendarioLetivoFindOneOutput;
  ambiente!: AmbienteFindOneOutput | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EventoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}

export class EventoListOutput extends PaginationResult<EventoFindOneOutput> {}

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

export type EventoInputRef = ObjectUuidRef;
