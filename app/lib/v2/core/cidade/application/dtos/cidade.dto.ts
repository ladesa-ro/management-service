import { ObjectIntRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { EstadoFindOneOutput } from "../../../estado/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CidadeFindOneInput {
  id!: number;
}

export class CidadeFindOneOutput {
  id!: number;

  nome!: string;

  estado!: EstadoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CidadeListInput extends PaginationInput {
  "filter.id"?: number[];

  "filter.estado.id"?: number[];
}

export class CidadeListOutput {
  meta!: PaginationMeta;
  data!: CidadeFindOneOutput[];
}

// ============================================================================
// Input Ref
// ============================================================================

export class CidadeInputRef extends ObjectIntRef {}
