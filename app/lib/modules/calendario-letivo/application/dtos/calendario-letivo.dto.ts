import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared";
import { CampusFindOneOutputDto, CampusInputRefDto } from "@/modules/campus";
import {
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoInputRefDto,
} from "@/modules/oferta-formacao";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class CalendarioLetivoFindOneInputDto extends FindOneInputDto {}

export class CalendarioLetivoFindOneOutputDto extends EntityOutputDto {
  nome!: string;
  ano!: number;
  campus!: CampusFindOneOutputDto;
  ofertaFormacao!: OfertaFormacaoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class CalendarioLetivoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.campus.id"?: IFilterAcceptableValues;
  "filter.ofertaFormacao.id"?: IFilterAcceptableValues;
}

export class CalendarioLetivoListOutputDto extends PaginationResultDto<CalendarioLetivoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class CalendarioLetivoCreateInputDto {
  nome!: string;
  ano!: number;
  campus!: CampusInputRefDto;
  ofertaFormacao!: OfertaFormacaoInputRefDto;
}

export class CalendarioLetivoUpdateInputDto {
  nome?: string;
  ano?: number;
  campus?: CampusInputRefDto;
  ofertaFormacao?: OfertaFormacaoInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type CalendarioLetivoInputRefDto = ObjectUuidRefDto;
