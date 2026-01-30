import { CampusFindOneOutput, CampusInputRef } from "../../../campus/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { OfertaFormacaoFindOneOutput, OfertaFormacaoInputRef, } from "../../../oferta-formacao/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CalendarioLetivoFindOneInput {
  id!: string;
}

export class CalendarioLetivoFindOneOutput {
  id!: string;

  nome!: string;

  ano!: number;

  campus!: CampusFindOneOutput;

  ofertaFormacao!: OfertaFormacaoFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CalendarioLetivoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.campus.id"?: string[];

  "filter.ofertaFormacao.id"?: string[];
}

export class CalendarioLetivoListOutput {
  meta!: PaginationMeta;
  data!: CalendarioLetivoFindOneOutput[];
}

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
