import {
  IdUuid,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
  ScalarDateTimeString,
} from "@/core/@shared";
import { CampusFindOneOutput, CampusInputRef } from "@/core/campus";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoInputRef } from "@/core/oferta-formacao";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CalendarioLetivoFindOneInput {
  id!: IdUuid;

  selection?: string[];
}

export class CalendarioLetivoFindOneOutput {
  id!: IdUuid;

  nome!: string;

  ano!: number;

  campus!: CampusFindOneOutput;

  ofertaFormacao!: OfertaFormacaoFindOneOutput;

  dateCreated!: ScalarDateTimeString;

  dateUpdated!: ScalarDateTimeString;

  dateDeleted!: ScalarDateTimeString | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CalendarioLetivoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;

  "filter.campus.id"?: IFilterAcceptableValues;

  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}

export class CalendarioLetivoListOutput extends PaginationResult<CalendarioLetivoFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class CalendarioLetivoCreateInput {
  nome!: string;

  ano!: number;

  campus!: CampusInputRef;

  ofertaFormacao!: OfertaFormacaoInputRef;
}

export class CalendarioLetivoUpdateInput {
  nome?: string;

  ano?: number;

  campus?: CampusInputRef;

  ofertaFormacao?: OfertaFormacaoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class CalendarioLetivoInputRef extends ObjectUuidRef {}
