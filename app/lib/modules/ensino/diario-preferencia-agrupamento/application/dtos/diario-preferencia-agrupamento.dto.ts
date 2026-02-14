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
  DiarioFindOneOutputDto,
  DiarioInputRefDto,
} from "@/modules/ensino/diario/application/dtos";
import {
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputRefDto,
} from "@/modules/sisgha/intervalo-de-tempo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioPreferenciaAgrupamentoFindOneInputDto extends FindOneInputDto {}

export class DiarioPreferenciaAgrupamentoFindOneOutputDto extends EntityOutputDto {
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  intervaloDeTempo!: IntervaloDeTempoFindOneOutputDto;
  diario!: DiarioFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiarioPreferenciaAgrupamentoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.diario.id"?: IFilterAcceptableValues;
}

export class DiarioPreferenciaAgrupamentoListOutputDto extends PaginationResultDto<DiarioPreferenciaAgrupamentoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiarioPreferenciaAgrupamentoCreateInputDto {
  dataInicio!: ScalarDate;
  dataFim?: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  intervaloDeTempo!: IntervaloDeTempoInputRefDto;
  diario!: DiarioInputRefDto;
}

export class DiarioPreferenciaAgrupamentoUpdateInputDto {
  dataInicio?: ScalarDate;
  dataFim?: ScalarDate | null;
  diaSemanaIso?: number;
  aulasSeguidas?: number;
  intervaloDeTempo?: IntervaloDeTempoInputRefDto;
  diario?: DiarioInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DiarioPreferenciaAgrupamentoInputRefDto = ObjectUuidRefDto;
