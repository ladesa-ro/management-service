import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { CidadeFindOneOutput, CidadeInputRef } from "@/core/cidade";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EnderecoFindOneInput {
  id!: string;
}

export class EnderecoFindOneOutput {
  id!: string;

  cep!: string;

  logradouro!: string;

  numero!: number;

  bairro!: string;

  complemento!: string | null;

  pontoReferencia!: string | null;

  cidade!: CidadeFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EnderecoListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.cidade.id"?: number[];
}

export class EnderecoListOutput {
  meta!: PaginationMeta;
  data!: EnderecoFindOneOutput[];
}

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
// Input Ref
// ============================================================================

export class EnderecoInputRef extends ObjectUuidRef {}
