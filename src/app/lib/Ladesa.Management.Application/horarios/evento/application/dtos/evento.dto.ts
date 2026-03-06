import type { ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";
import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/Ladesa.Management.Application/@shared/application/dtos";
import {
  AmbienteFindOneOutputDto,
  AmbienteInputRefDto,
} from "@/Ladesa.Management.Application/ambientes/ambiente";
import {
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoInputRefDto,
} from "@/Ladesa.Management.Application/horarios/calendario-letivo";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class EventoFindOneInputDto extends FindOneInputDto {}

export class EventoFindOneOutputDto extends EntityOutputDto {
  nome!: string | null;
  rrule!: string;
  cor!: string | null;
  dataInicio!: ScalarDateTimeString | null;
  dataFim!: ScalarDateTimeString | null;
  calendario!: CalendarioLetivoFindOneOutputDto;
  ambiente!: AmbienteFindOneOutputDto | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class EventoListInputDto extends PaginationInputDto {
  "filter.id"?: IFilterAcceptableValues;
  "filter.calendario.id"?: IFilterAcceptableValues;
}

export class EventoListOutputDto extends PaginationResultDto<EventoFindOneOutputDto> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class EventoCreateInputDto {
  nome?: string | null;
  rrule!: string;
  cor?: string | null;
  dataInicio?: ScalarDateTimeString | null;
  dataFim?: ScalarDateTimeString | null;
  calendario!: CalendarioLetivoInputRefDto;
  ambiente?: AmbienteInputRefDto | null;
}

export class EventoUpdateInputDto {
  nome?: string | null;
  rrule?: string;
  cor?: string | null;
  dataInicio?: ScalarDateTimeString | null;
  dataFim?: ScalarDateTimeString | null;
  calendario?: CalendarioLetivoInputRefDto;
  ambiente?: AmbienteInputRefDto | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type EventoInputRefDto = ObjectUuidRefDto;
