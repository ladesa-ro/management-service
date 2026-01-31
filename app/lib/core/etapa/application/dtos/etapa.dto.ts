import type { ScalarDate } from "@/core/@shared";
import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared/application/dtos";
import { CalendarioLetivoFindOneOutput, CalendarioLetivoInputRef } from "@/core/calendario-letivo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EtapaFindOneInput extends FindOneInput {}

export class EtapaFindOneOutput extends EntityOutput {
  numero!: number | null;
  dataInicio!: ScalarDate;
  dataTermino!: ScalarDate;
  cor!: string | null;
  calendario!: CalendarioLetivoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EtapaListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}

export class EtapaListOutput extends PaginationResult<EtapaFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class EtapaCreateInput {
  numero?: number | null;
  dataInicio!: ScalarDate;
  dataTermino!: ScalarDate;
  cor?: string | null;
  calendario!: CalendarioLetivoInputRef;
}

export class EtapaUpdateInput {
  numero?: number | null;
  dataInicio?: ScalarDate;
  dataTermino?: ScalarDate;
  cor?: string | null;
  calendario?: CalendarioLetivoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export type EtapaInputRef = ObjectUuidRef;
