import {
  IdNumeric,
  IFilterAcceptableValues,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EstadoFindOneInputDto {
  id!: IdNumeric;

  selection?: string[];
}

export class EstadoFindOneOutputDto {
  id!: IdNumeric;

  nome!: string;
  sigla!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EstadoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
}

export class EstadoListOutputDto extends PaginationResultDto<EstadoFindOneOutputDto> {}
