import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { DiarioFindOneOutput, DiarioInputRef } from "../../../diario/application/dtos";
import {
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInputRef,
} from "../../../intervalo-de-tempo/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioPreferenciaAgrupamentoFindOneInput {
  id!: string;
}

export class DiarioPreferenciaAgrupamentoFindOneOutput {
  id!: string;

  dataInicio!: Date;

  dataFim!: Date | null;

  diaSemanaIso!: number;

  aulasSeguidas!: number;

  intervaloDeTempo!: IntervaloDeTempoFindOneOutput;

  diario!: DiarioFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiarioPreferenciaAgrupamentoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.diario.id"?: string[];
}

export class DiarioPreferenciaAgrupamentoListOutput {
  meta!: PaginationMeta;
  data!: DiarioPreferenciaAgrupamentoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiarioPreferenciaAgrupamentoCreateInput {
  dataInicio!: Date;

  dataFim?: Date | null;

  diaSemanaIso!: number;

  aulasSeguidas!: number;

  intervaloDeTempo!: IntervaloDeTempoInputRef;

  diario!: DiarioInputRef;
}

export class DiarioPreferenciaAgrupamentoUpdateInput {
  dataInicio?: Date;

  dataFim?: Date | null;

  diaSemanaIso?: number;

  aulasSeguidas?: number;

  intervaloDeTempo?: IntervaloDeTempoInputRef;

  diario?: DiarioInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class DiarioPreferenciaAgrupamentoInputRef extends ObjectUuidRef {}
