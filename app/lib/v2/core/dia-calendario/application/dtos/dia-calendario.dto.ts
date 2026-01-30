import { CalendarioLetivoFindOneOutput, CalendarioLetivoInputRef, } from "../../../calendario-letivo/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiaCalendarioFindOneInput {
  id!: string;
}

export class DiaCalendarioFindOneOutput {
  id!: string;

  data!: Date;

  diaLetivo!: boolean;

  feriado!: string;

  diaPresencial!: boolean;

  tipo!: string;

  extraCurricular!: boolean;

  calendario!: CalendarioLetivoFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiaCalendarioListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.calendario.id"?: string[];
}

export class DiaCalendarioListOutput {
  meta!: PaginationMeta;
  data!: DiaCalendarioFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiaCalendarioCreateInput {
  data!: Date;

  diaLetivo!: boolean;

  feriado!: string;

  diaPresencial!: boolean;

  tipo!: string;

  extraCurricular!: boolean;

  calendario!: CalendarioLetivoInputRef;
}

export class DiaCalendarioUpdateInput {
  data?: Date;

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

export class DiaCalendarioInputRef extends ObjectUuidRef {}
