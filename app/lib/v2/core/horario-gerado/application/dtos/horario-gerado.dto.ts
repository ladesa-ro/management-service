import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import {
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoInputRef,
} from "../../../calendario-letivo/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class HorarioGeradoFindOneInput {
  id!: string;
}

export class HorarioGeradoFindOneOutput {
  id!: string;

  status!: string | null;

  tipo!: string | null;

  dataGeracao!: Date | null;

  vigenciaInicio!: Date | null;

  vigenciaFim!: Date | null;

  calendario!: CalendarioLetivoFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class HorarioGeradoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.calendario.id"?: string[];
}

export class HorarioGeradoListOutput {
  meta!: PaginationMeta;
  data!: HorarioGeradoFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class HorarioGeradoCreateInput {
  status?: string | null;

  tipo?: string | null;

  dataGeracao?: Date | null;

  vigenciaInicio?: Date | null;

  vigenciaFim?: Date | null;

  calendario!: CalendarioLetivoInputRef;
}

export class HorarioGeradoUpdateInput {
  status?: string | null;

  tipo?: string | null;

  dataGeracao?: Date | null;

  vigenciaInicio?: Date | null;

  vigenciaFim?: Date | null;

  calendario?: CalendarioLetivoInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class HorarioGeradoInputRef extends ObjectUuidRef {}
