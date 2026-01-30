import { IdNumeric, IFilterAcceptableValues, PaginationInput, PaginationResult } from "@/core/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EstadoFindOneInput {
  id!: IdNumeric;

  selection?: string[];
}

export class EstadoFindOneOutput {
  id!: IdNumeric;

  nome!: string;
  sigla!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EstadoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
}

export class EstadoListOutput extends PaginationResult<EstadoFindOneOutput> {
}
