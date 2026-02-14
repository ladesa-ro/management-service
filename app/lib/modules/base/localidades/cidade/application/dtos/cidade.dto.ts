import {
  IdNumeric,
  IFilterAcceptableValues,
  ObjectIntRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import { EstadoFindOneOutputDto } from "@/modules/base/localidades/estado";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CidadeFindOneInputDto {
  id!: IdNumeric;

  selection?: string[];
}

export class CidadeFindOneOutputDto {
  id!: IdNumeric;

  nome!: string;

  estado!: EstadoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CidadeListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.estado.id"?: IFilterAcceptableValues;
  "filter.estado.nome"?: IFilterAcceptableValues;
  "filter.estado.sigla"?: IFilterAcceptableValues;
}

export class CidadeListOutputDto extends PaginationResultDto<CidadeFindOneOutputDto> {}

// ============================================================================
// Input Ref
// ============================================================================

export type CidadeInputRefDto = ObjectIntRefDto;
