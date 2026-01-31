import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared/application/dtos";
import {
  EnderecoCreateInput,
  EnderecoFindOneOutput,
  EnderecoUpdateInput,
} from "@/modules/endereco";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CampusFindOneInput extends FindOneInput {}

export class CampusFindOneOutput extends EntityOutput {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: EnderecoFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CampusListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
}

export class CampusListOutput extends PaginationResult<CampusFindOneOutput> {}

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

export type CampusInputRef = ObjectUuidRef;
