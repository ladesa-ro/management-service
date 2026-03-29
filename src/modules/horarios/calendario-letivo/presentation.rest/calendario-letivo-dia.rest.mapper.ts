import { createListMapper, createMapper, into } from "@/shared/mapping";
import {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaListQuery,
  CalendarioLetivoDiaUpdateCommand,
} from "../domain";
import type { CalendarioLetivoDiaFindOneQueryResult } from "../domain/queries";
import * as CalendarioLetivoRestMapper from "./calendario-letivo.rest.mapper";
import {
  type CalendarioLetivoDiaFindByDataParamsRestDto,
  CalendarioLetivoDiaFindOneOutputRestDto,
  type CalendarioLetivoDiaListInputRestDto,
  CalendarioLetivoDiaListOutputRestDto,
  type CalendarioLetivoDiaParentParamsRestDto,
  type CalendarioLetivoDiaUpdateInputRestDto,
  type TipoCalendarioLetivoDia,
} from "./calendario-letivo-dia.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export function listInputDtoToListQuery(
  parentParams: CalendarioLetivoDiaParentParamsRestDto,
  dto: CalendarioLetivoDiaListInputRestDto,
): CalendarioLetivoDiaListQuery {
  const input = new CalendarioLetivoDiaListQuery();
  input.page = dto.page;
  input.limit = dto.limit;
  input.search = dto.search;
  input.sortBy = dto.sortBy;
  into(input).field("filter.id").from(dto);
  input["filter.calendario.id"] = [parentParams.calendarioLetivoId];
  return input;
}

export const toFindByDataInput = createMapper<
  CalendarioLetivoDiaFindByDataParamsRestDto,
  CalendarioLetivoDiaFindOneQuery
>((params) => {
  const input = new CalendarioLetivoDiaFindOneQuery();
  input.calendarioLetivoId = params.calendarioLetivoId;
  input.data = params.data;
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  {
    params: CalendarioLetivoDiaFindByDataParamsRestDto;
    dto: CalendarioLetivoDiaUpdateInputRestDto;
  },
  CalendarioLetivoDiaFindOneQuery & CalendarioLetivoDiaUpdateCommand
>(({ params, dto }) => ({
  id: "",
  calendarioLetivoId: params.calendarioLetivoId,
  data: params.data,
  diaLetivo: dto.diaLetivo,
  feriado: dto.feriado !== undefined ? (dto.feriado ?? "") : undefined,
  diaPresencial: dto.diaPresencial,
  tipo: dto.tipo,
  extraCurricular: dto.extraCurricular,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CalendarioLetivoDiaFindOneQueryResult,
  CalendarioLetivoDiaFindOneOutputRestDto
>((output) => {
  const dto = new CalendarioLetivoDiaFindOneOutputRestDto();
  dto.id = output.id;
  dto.data = output.data;
  dto.diaLetivo = output.diaLetivo;
  dto.feriado = output.feriado;
  dto.diaPresencial = output.diaPresencial;
  dto.tipo = output.tipo as TipoCalendarioLetivoDia;
  dto.extraCurricular = output.extraCurricular;
  dto.calendario = CalendarioLetivoRestMapper.findOneQueryResultToOutputDto.mapOptional(
    output.calendario,
  );
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});

export const listQueryResultToListOutputDto = createListMapper(
  CalendarioLetivoDiaListOutputRestDto,
  findOneQueryResultToOutputDto,
);
