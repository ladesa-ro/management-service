import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ModalidadeFindOneInputDto extends FindOneInputDto {}

export class ModalidadeFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  slug!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ModalidadeListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
}

export class ModalidadeListOutputDto extends PaginationResultDto<ModalidadeFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ModalidadeCreateInputDto {
  nome!: string;
  slug!: string;
}

export class ModalidadeUpdateInputDto {
  nome?: string;
  slug?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export type ModalidadeInputRefDto = ObjectUuidRefDto;
