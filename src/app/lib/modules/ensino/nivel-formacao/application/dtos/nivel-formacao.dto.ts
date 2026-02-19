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

export class NivelFormacaoFindOneInputDto extends FindOneInputDto {}

export class NivelFormacaoFindOneOutputDto extends EntityOutputDto {
  slug!: string;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class NivelFormacaoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
}

export class NivelFormacaoListOutputDto extends PaginationResultDto<NivelFormacaoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class NivelFormacaoCreateInputDto {
  slug!: string;
}

export class NivelFormacaoUpdateInputDto {
  slug?: string;
}

// ============================================================================
// Input Ref
// ============================================================================

export type NivelFormacaoInputRefDto = ObjectUuidRefDto;
