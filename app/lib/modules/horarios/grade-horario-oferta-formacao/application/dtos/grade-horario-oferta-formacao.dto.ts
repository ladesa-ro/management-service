import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import { CampusFindOneOutputDto, CampusInputRefDto } from "@/modules/ambientes/campus";
import {
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoInputRefDto,
} from "@/modules/ensino/oferta-formacao";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoFindOneInputDto extends FindOneInputDto {}

export class GradeHorarioOfertaFormacaoFindOneOutputDto extends EntityOutputDto {
  campus!: CampusFindOneOutputDto;
  ofertaFormacao!: OfertaFormacaoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class GradeHorarioOfertaFormacaoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}

export class GradeHorarioOfertaFormacaoListOutputDto extends PaginationResultDto<GradeHorarioOfertaFormacaoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class GradeHorarioOfertaFormacaoCreateInputDto {
  campus!: CampusInputRefDto;
  ofertaFormacao!: OfertaFormacaoInputRefDto;
}

export class GradeHorarioOfertaFormacaoUpdateInputDto {
  campus?: CampusInputRefDto;
  ofertaFormacao?: OfertaFormacaoInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type GradeHorarioOfertaFormacaoInputRefDto = ObjectUuidRefDto;
