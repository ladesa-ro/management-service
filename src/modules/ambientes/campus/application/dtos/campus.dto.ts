import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import {
  EnderecoCreateInputDto,
  EnderecoFindOneOutputDto,
  EnderecoUpdateInputDto,
} from "@/modules/localidades/endereco";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CampusFindOneInputDto extends FindOneInputDto {}

export class CampusFindOneOutputDto extends EntityOutputDto {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: EnderecoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CampusListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
}

export class CampusListOutputDto extends PaginationResultDto<CampusFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class CampusCreateInputDto {
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: EnderecoCreateInputDto;
}

export class CampusUpdateInputDto {
  nomeFantasia?: string;
  razaoSocial?: string;
  apelido?: string;
  cnpj?: string;
  endereco?: EnderecoUpdateInputDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type CampusInputRefDto = ObjectUuidRefDto;
