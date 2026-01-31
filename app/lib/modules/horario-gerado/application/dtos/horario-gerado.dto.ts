import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
  ScalarDate,
} from "@/modules/@shared";
import {
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoInputRef,
} from "@/modules/calendario-letivo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class HorarioGeradoFindOneInput extends FindOneInput {}

export class HorarioGeradoFindOneOutput extends EntityOutput {
  status!: string | null;
  tipo!: string | null;
  dataGeracao!: ScalarDate | null;
  vigenciaInicio!: ScalarDate | null;
  vigenciaFim!: ScalarDate | null;
  calendario!: CalendarioLetivoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class HorarioGeradoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}

export class HorarioGeradoListOutput extends PaginationResult<HorarioGeradoFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class HorarioGeradoCreateInput {
  status?: string | null;
  tipo?: string | null;
  dataGeracao?: ScalarDate | null;
  vigenciaInicio?: ScalarDate | null;
  vigenciaFim?: ScalarDate | null;
  calendario!: CalendarioLetivoInputRef;
}

export class HorarioGeradoUpdateInput {
  status?: string | null;
  tipo?: string | null;
  dataGeracao?: ScalarDate | null;
  vigenciaInicio?: ScalarDate | null;
  vigenciaFim?: ScalarDate | null;
  calendario?: CalendarioLetivoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export type HorarioGeradoInputRef = ObjectUuidRef;
