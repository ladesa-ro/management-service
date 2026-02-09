import type { ScalarDateTimeString } from "@/modules/@shared";
import {
  EntityOutputDto,
  FindOneInputDto,
  IFilterAcceptableValues,
  ObjectUuidRefDto,
  PaginationInputDto,
  PaginationResultDto,
} from "@/modules/@shared/application/dtos";
import { AmbienteFindOneOutputDto, AmbienteInputRefDto } from "@/modules/ambiente";
import {
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoInputRefDto,
} from "@/modules/calendario-letivo";

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
