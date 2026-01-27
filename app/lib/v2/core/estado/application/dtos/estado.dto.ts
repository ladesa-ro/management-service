import { PaginationInput, PaginationMeta } from "../../../common/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EstadoFindOneInput {
  id!: number;
}

export class EstadoFindOneOutput {
  id!: number;

  nome!: string;

  sigla!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EstadoListInput extends PaginationInput {
  "filter.id"?: number[];
}

export class EstadoListOutput {
  meta!: PaginationMeta;
  data!: EstadoFindOneOutput[];
}
