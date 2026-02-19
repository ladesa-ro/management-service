import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import { ModalidadeFindOneOutputDto, ModalidadeInputRefDto } from "@/modules/ensino/modalidade";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class OfertaFormacaoFindOneInputDto extends FindOneInputDto {}

export class OfertaFormacaoFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  slug!: string;
  modalidade!: ModalidadeFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class OfertaFormacaoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;

  "filter.modalidade.id"?: IFilterAcceptableValues;
}

export class OfertaFormacaoListOutputDto extends PaginationResultDto<OfertaFormacaoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class OfertaFormacaoCreateInputDto {
  nome!: string;

  slug!: string;

  modalidade!: ModalidadeInputRefDto;
}

export class OfertaFormacaoUpdateInputDto {
  nome?: string;

  slug?: string;

  modalidade?: ModalidadeInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type OfertaFormacaoInputRefDto = ObjectUuidRefDto;
