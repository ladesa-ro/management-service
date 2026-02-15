import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
  ScalarDate,
} from "@/modules/@shared";
import {
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoInputRefDto,
} from "@/modules/sisgha/calendario-letivo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiaCalendarioFindOneInputDto extends FindOneInputDto {}

export class DiaCalendarioFindOneOutputDto extends EntityOutputDto {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiaCalendarioListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}

export class DiaCalendarioListOutputDto extends PaginationResultDto<DiaCalendarioFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiaCalendarioCreateInputDto {
  data!: ScalarDate;
  diaLetivo!: boolean;
  feriado!: string;
  diaPresencial!: boolean;
  tipo!: string;
  extraCurricular!: boolean;
  calendario!: CalendarioLetivoInputRefDto;
}

export class DiaCalendarioUpdateInputDto {
  data?: ScalarDate;
  diaLetivo?: boolean;
  feriado?: string;
  diaPresencial?: boolean;
  tipo?: string;
  extraCurricular?: boolean;
  calendario?: CalendarioLetivoInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DiaCalendarioInputRefDto = ObjectUuidRefDto;
