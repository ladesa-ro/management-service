import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import { EnderecoCreateInput, EnderecoFindOneOutput, EnderecoUpdateInput, } from "../../../endereco/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CampusFindOneInput {
  id!: string;
}

export class CampusFindOneOutput {
  id!: string;

  nomeFantasia!: string;

  razaoSocial!: string;

  apelido!: string;

  cnpj!: string;

  endereco!: EnderecoFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CampusListInput extends PaginationInput {
  "filter.id"?: string[];
}

export class CampusListOutput {
  meta!: PaginationMeta;
  data!: CampusFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class CampusCreateInput {
  nomeFantasia!: string;

  razaoSocial!: string;

  apelido!: string;

  cnpj!: string;

  endereco!: EnderecoCreateInput;
}

export class CampusUpdateInput {
  nomeFantasia?: string;

  razaoSocial?: string;

  apelido?: string;

  cnpj?: string;

  endereco?: EnderecoUpdateInput;
}

// ============================================================================
// Input Ref
// ============================================================================

export class CampusInputRef extends ObjectUuidRef {}
