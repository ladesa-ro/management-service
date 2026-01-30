import {
  IdUuid,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
  ScalarDateTimeString,
} from "@/core/@shared";
import { CidadeFindOneOutput, CidadeInputRef } from "@/core/cidade";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EnderecoFindOneInput {
  id!: IdUuid;

  selection?: string[];
}

export class EnderecoFindOneOutput {
  id!: IdUuid;

  cep!: string;

  logradouro!: string;

  numero!: number;

  bairro!: string;

  complemento!: string | null;

  pontoReferencia!: string | null;

  cidade!: CidadeFindOneOutput;

  dateCreated!: ScalarDateTimeString;

  dateUpdated!: ScalarDateTimeString;

  dateDeleted!: ScalarDateTimeString | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EnderecoListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.cidade.id"?: IFilterAcceptableValues;
}

export class EnderecoListOutput extends PaginationResult<EnderecoFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class EnderecoCreateInput {
  cep!: string;

  logradouro!: string;

  numero!: number;

  bairro!: string;

  complemento?: string | null;

  pontoReferencia?: string | null;

  cidade!: CidadeInputRef;
}

export class EnderecoUpdateInput {
  cep?: string;

  logradouro?: string;

  numero?: number;

  bairro?: string;

  complemento?: string | null;

  pontoReferencia?: string | null;

  cidade?: CidadeInputRef;
}

// ============================================================================
// Internal Input for create-or-update pattern
// ============================================================================

export class EnderecoInputDto {
  cep!: string;

  logradouro!: string;

  numero!: number;

  bairro!: string;

  complemento?: string | null;

  pontoReferencia?: string | null;

  cidade!: CidadeInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class EnderecoInputRef extends ObjectUuidRef {}
