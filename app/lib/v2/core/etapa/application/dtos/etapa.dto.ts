import { CalendarioLetivoFindOneOutput, CalendarioLetivoInputRef, } from "../../../calendario-letivo/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EtapaFindOneInput {
  id!: string;
}

export class EtapaFindOneOutput {
  id!: string;

  numero!: number | null;

  dataInicio!: Date;

  dataTermino!: Date;

  cor!: string | null;

  calendario!: CalendarioLetivoFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EtapaListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.calendario.id"?: string[];
}

export class EtapaListOutput {
  meta!: PaginationMeta;
  data!: EtapaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class EtapaCreateInput {
  numero?: number | null;

  dataInicio!: Date;

  dataTermino!: Date;

  cor?: string | null;

  calendario!: CalendarioLetivoInputRef;
}

export class EtapaUpdateInput {
  numero?: number | null;

  dataInicio?: Date;

  dataTermino?: Date;

  cor?: string | null;

  calendario?: CalendarioLetivoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class EtapaInputRef extends ObjectUuidRef {}
