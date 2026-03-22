import { createListOutputMapper } from "@/shared/mapping";
import { getNow } from "@/utils/date";
import {
  CalendarioLetivoDiaFindOneQuery,
  CalendarioLetivoDiaListQuery,
  CalendarioLetivoDiaUpdateCommand,
} from "../domain";
import type { CalendarioLetivoDiaFindOneQueryResult } from "../domain/queries";
import { CalendarioLetivoRestMapper } from "./calendario-letivo.rest.mapper";
import {
  CalendarioLetivoDiaFindByDataParamsRestDto,
  CalendarioLetivoDiaFindOneOutputRestDto,
  CalendarioLetivoDiaListInputRestDto,
  CalendarioLetivoDiaListOutputRestDto,
  CalendarioLetivoDiaParentParamsRestDto,
  CalendarioLetivoDiaUpdateInputRestDto,
  type TipoCalendarioLetivoDia,
} from "./calendario-letivo-dia.rest.dto";

export class CalendarioLetivoDiaRestMapper {
  static toListInput(
    parentParams: CalendarioLetivoDiaParentParamsRestDto,
    dto: CalendarioLetivoDiaListInputRestDto,
  ): CalendarioLetivoDiaListQuery {
    const input = new CalendarioLetivoDiaListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto["filter.id"];
    input["filter.calendario.id"] = [parentParams.calendarioLetivoId];
    return input;
  }

  static toFindByDataInput(
    params: CalendarioLetivoDiaFindByDataParamsRestDto,
  ): CalendarioLetivoDiaFindOneQuery {
    const input = new CalendarioLetivoDiaFindOneQuery();
    input.calendarioLetivoId = params.calendarioLetivoId;
    input.data = params.data;
    return input;
  }

  static toUpdateInput(
    params: CalendarioLetivoDiaFindByDataParamsRestDto,
    dto: CalendarioLetivoDiaUpdateInputRestDto,
  ): CalendarioLetivoDiaFindOneQuery & CalendarioLetivoDiaUpdateCommand {
    const input = new CalendarioLetivoDiaFindOneQuery() as CalendarioLetivoDiaFindOneQuery &
      CalendarioLetivoDiaUpdateCommand;
    input.calendarioLetivoId = params.calendarioLetivoId;
    input.data = params.data;
    if (dto.diaLetivo !== undefined) input.diaLetivo = dto.diaLetivo;
    if (dto.feriado !== undefined) input.feriado = dto.feriado ?? "";
    if (dto.diaPresencial !== undefined) input.diaPresencial = dto.diaPresencial;
    if (dto.tipo !== undefined) input.tipo = dto.tipo;
    if (dto.extraCurricular !== undefined) input.extraCurricular = dto.extraCurricular;
    return input;
  }

  static toFindOneOutputDto(
    output: CalendarioLetivoDiaFindOneQueryResult,
  ): CalendarioLetivoDiaFindOneOutputRestDto {
    const dto = new CalendarioLetivoDiaFindOneOutputRestDto();
    dto.id = output.id;
    dto.data = output.data;
    dto.diaLetivo = output.diaLetivo;
    dto.feriado = output.feriado;
    dto.diaPresencial = output.diaPresencial;
    dto.tipo = output.tipo as TipoCalendarioLetivoDia;
    dto.extraCurricular = output.extraCurricular;
    dto.calendario = CalendarioLetivoRestMapper.toFindOneOutputDto(output.calendario);
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : getNow();
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : getNow();
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    CalendarioLetivoDiaListOutputRestDto,
    CalendarioLetivoDiaRestMapper.toFindOneOutputDto,
  );
}
