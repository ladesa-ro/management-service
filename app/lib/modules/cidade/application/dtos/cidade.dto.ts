import {
  IdNumeric,
  IFilterAcceptableValues,
  ObjectIntRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared";
import { EstadoFindOneOutput } from "@/modules/estado";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CidadeFindOneInput {
  id!: IdNumeric;

  selection?: string[];
}

export class CidadeFindOneOutput {
  id!: IdNumeric;

  nome!: string;

  estado!: EstadoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CidadeListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.estado.id"?: IFilterAcceptableValues;
  "filter.estado.nome"?: IFilterAcceptableValues;
  "filter.estado.sigla"?: IFilterAcceptableValues;
}

export class CidadeListOutput extends PaginationResult<CidadeFindOneOutput> {}

// ============================================================================
// Input Ref
// ============================================================================

export type CidadeInputRef = ObjectIntRef;
