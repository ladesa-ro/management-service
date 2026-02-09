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
} from "@/modules/calendario-letivo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class HorarioGeradoFindOneInputDto extends FindOneInputDto {}

export class HorarioGeradoFindOneOutputDto extends EntityOutputDto {
  status!: string | null;
  tipo!: string | null;
  dataGeracao!: ScalarDate | null;
  vigenciaInicio!: ScalarDate | null;
  vigenciaFim!: ScalarDate | null;
  calendario!: CalendarioLetivoFindOneOutputDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class HorarioGeradoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}

export class HorarioGeradoListOutputDto extends PaginationResultDto<HorarioGeradoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class HorarioGeradoCreateInputDto {
  status?: string | null;
  tipo?: string | null;
  dataGeracao?: ScalarDate | null;
  vigenciaInicio?: ScalarDate | null;
  vigenciaFim?: ScalarDate | null;
  calendario!: CalendarioLetivoInputRefDto;
}

export class HorarioGeradoUpdateInputDto {
  status?: string | null;
  tipo?: string | null;
  dataGeracao?: ScalarDate | null;
  vigenciaInicio?: ScalarDate | null;
  vigenciaFim?: ScalarDate | null;
  calendario?: CalendarioLetivoInputRefDto;
}

// ============================================================================
// Input Ref
// ============================================================================

export type HorarioGeradoInputRefDto = ObjectUuidRefDto;
