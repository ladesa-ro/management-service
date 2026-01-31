import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
  ScalarDate,
} from "@/core/@shared";
import { CalendarioLetivoFindOneOutput, CalendarioLetivoInputRef } from "@/core/calendario-letivo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiaCalendarioFindOneInput extends FindOneInput {}

export class DiaCalendarioFindOneOutput extends EntityOutput {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiaCalendarioListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}

export class DiaCalendarioListOutput extends PaginationResult<DiaCalendarioFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiaCalendarioCreateInput {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivoInputRef;
}

export class DiaCalendarioUpdateInput {
  data?: ScalarDate;
  diaLetivo?: boolean;
  feriado?: string;
  diaPresencial?: boolean;
  tipo?: string;
  extraCurricular?: boolean;
  calendario?: CalendarioLetivoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DiaCalendarioInputRef = ObjectUuidRef;
