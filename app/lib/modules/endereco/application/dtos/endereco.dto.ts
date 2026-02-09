import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import { CidadeFindOneOutputDto, CidadeInputRefDto } from "@/modules/cidade";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EnderecoFindOneInputDto extends FindOneInputDto {}

export class EnderecoFindOneOutputDto extends EntityOutputDto {
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: CidadeFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EnderecoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.cidade.id"?: IFilterAcceptableValues;
}

export class EnderecoListOutputDto extends PaginationResultDto<EnderecoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class EnderecoCreateInputDto {
  cep!: string;

  logradouro!: string;

  numero!: number;

  bairro!: string;

  complemento?: string | null;

  pontoReferencia?: string | null;

  cidade!: CidadeInputRefDto;
}

export class EnderecoUpdateInputDto {
  cep?: string;

  logradouro?: string;

  numero?: number;

  bairro?: string;

  complemento?: string | null;

  pontoReferencia?: string | null;

  cidade?: CidadeInputRefDto;
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

  cidade!: CidadeInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type EnderecoInputRefDto = ObjectUuidRefDto;
