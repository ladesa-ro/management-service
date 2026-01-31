import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
  ScalarDate,
} from "@/modules/@shared";
import { DiarioFindOneOutput, DiarioInputRef } from "@/modules/diario/application/dtos";
import {
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInputRef,
} from "@/modules/intervalo-de-tempo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioPreferenciaAgrupamentoFindOneInput extends FindOneInput {}

export class DiarioPreferenciaAgrupamentoFindOneOutput extends EntityOutput {
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;
  diario!: DiarioFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiarioPreferenciaAgrupamentoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
}

export class DiarioPreferenciaAgrupamentoListOutput extends PaginationResult<DiarioPreferenciaAgrupamentoFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiarioPreferenciaAgrupamentoCreateInput {
  dataInicio!: ScalarDate;
  dataFim?: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  intervaloDeTempo!: IntervaloDeTempoInputRef;
  diario!: DiarioInputRef;
}

export class DiarioPreferenciaAgrupamentoUpdateInput {
  dataInicio?: ScalarDate;
  dataFim?: ScalarDate | null;
  diaSemanaIso?: number;
  aulasSeguidas?: number;
  intervaloDeTempo?: IntervaloDeTempoInputRef;
  diario?: DiarioInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DiarioPreferenciaAgrupamentoInputRef = ObjectUuidRef;
