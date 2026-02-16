import type { ScalarDate } from "@/modules/@shared";
import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import {
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoInputRefDto,
} from "@/modules/horarios/calendario-letivo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EtapaFindOneInputDto extends FindOneInputDto {}

export class EtapaFindOneOutputDto extends EntityOutputDto {
  numero!: number | null;
  dataInicio!: ScalarDate;
  dataTermino!: ScalarDate;
  cor!: string | null;
  calendario!: CalendarioLetivoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EtapaListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}

export class EtapaListOutputDto extends PaginationResultDto<EtapaFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class EtapaCreateInputDto {
  numero?: number | null;
  dataInicio!: ScalarDate;
  dataTermino!: ScalarDate;
  cor?: string | null;
  calendario!: CalendarioLetivoInputRefDto;
}

export class EtapaUpdateInputDto {
  numero?: number | null;
  dataInicio?: ScalarDate;
  dataTermino?: ScalarDate;
  cor?: string | null;
  calendario?: CalendarioLetivoInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type EtapaInputRefDto = ObjectUuidRefDto;
