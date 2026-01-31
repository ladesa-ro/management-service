import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared";
import { CidadeFindOneOutput, CidadeInputRef } from "@/modules/cidade";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EnderecoFindOneInput extends FindOneInput {}

export class EnderecoFindOneOutput extends EntityOutput {
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: CidadeFindOneOutput;
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

export type EnderecoInputRef = ObjectUuidRef;
