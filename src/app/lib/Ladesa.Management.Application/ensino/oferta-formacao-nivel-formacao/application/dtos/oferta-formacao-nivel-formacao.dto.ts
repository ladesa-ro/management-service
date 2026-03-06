import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/Ladesa.Management.Application/@shared";
import {
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoInputRefDto,
} from "@/Ladesa.Management.Application/ensino/nivel-formacao";
import {
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoInputRefDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class OfertaFormacaoNivelFormacaoFindOneInputDto extends FindOneInputDto {}

export class OfertaFormacaoNivelFormacaoFindOneOutputDto extends EntityOutputDto {
  nivelFormacao!: NivelFormacaoFindOneOutputDto;
  ofertaFormacao!: OfertaFormacaoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class OfertaFormacaoNivelFormacaoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.nivelFormacao.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}

export class OfertaFormacaoNivelFormacaoListOutputDto extends PaginationResultDto<OfertaFormacaoNivelFormacaoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class OfertaFormacaoNivelFormacaoCreateInputDto {
  nivelFormacao!: NivelFormacaoInputRefDto;
  ofertaFormacao!: OfertaFormacaoInputRefDto;
}

export class OfertaFormacaoNivelFormacaoUpdateInputDto {
  nivelFormacao?: NivelFormacaoInputRefDto;
  ofertaFormacao?: OfertaFormacaoInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type OfertaFormacaoNivelFormacaoInputRefDto = ObjectUuidRefDto;
