import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared";
import { CampusFindOneOutput, CampusInputRef } from "@/core/campus";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoInputRef } from "@/core/oferta-formacao";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CalendarioLetivoFindOneInput extends FindOneInput {}

export class CalendarioLetivoFindOneOutput extends EntityOutput {
  nome!: string;
  ano!: number;
  campus!: CampusFindOneOutput;
  ofertaFormacao!: OfertaFormacaoFindOneOutput;
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

export type CalendarioLetivoInputRef = ObjectUuidRef;
