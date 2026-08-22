import * as AmbienteRestMapper from "@/modules/ambientes/ambiente/presentation.rest/ambiente.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import type { CalendarioIndisponibilidadeAmbienteTipo } from "../domain/calendario-indisponibilidade-ambiente.types";
import { CalendarioIndisponibilidadeAmbienteCreateCommand } from "../domain/commands/calendario-indisponibilidade-ambiente-create.command";
import { CalendarioIndisponibilidadeAmbienteFindOneQuery } from "../domain/queries/calendario-indisponibilidade-ambiente-find-one.query";
import type { CalendarioIndisponibilidadeAmbienteFindOneQueryResult } from "../domain/queries/calendario-indisponibilidade-ambiente-find-one.query.result";
import { CalendarioIndisponibilidadeAmbienteListQuery } from "../domain/queries/calendario-indisponibilidade-ambiente-list.query";
import type { CalendarioIndisponibilidadeAmbientePorPeriodoQuery } from "../domain/queries/calendario-indisponibilidade-ambiente-por-periodo.query";
import {
  type CalendarioIndisponibilidadeAmbienteCreateInputRestDto,
  type CalendarioIndisponibilidadeAmbienteFindOneInputRestDto,
  CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto,
  type CalendarioIndisponibilidadeAmbienteListInputRestDto,
  CalendarioIndisponibilidadeAmbienteListOutputRestDto,
  type CalendarioIndisponibilidadeAmbientePorPeriodoQueryRestDto,
} from "./calendario-indisponibilidade-ambiente.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  CalendarioIndisponibilidadeAmbienteFindOneInputRestDto,
  CalendarioIndisponibilidadeAmbienteFindOneQuery
>((dto) => {
  const input = new CalendarioIndisponibilidadeAmbienteFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  CalendarioIndisponibilidadeAmbienteListInputRestDto,
  CalendarioIndisponibilidadeAmbienteListQuery
>(CalendarioIndisponibilidadeAmbienteListQuery, (dto, query) => {
  into(query).from(dto).field("filter.id").field("filter.ambiente.id").field("filter.tipo");
});

export const createInputDtoToCreateCommand = createMapper<
  CalendarioIndisponibilidadeAmbienteCreateInputRestDto,
  CalendarioIndisponibilidadeAmbienteCreateCommand
>((dto) => {
  const input = new CalendarioIndisponibilidadeAmbienteCreateCommand();
  input.ambiente = { id: dto.ambiente.id };
  input.tipo = dto.tipo as CalendarioIndisponibilidadeAmbienteTipo;
  input.diaSemana = dto.diaSemana ?? null;
  input.data = dto.data ?? null;
  input.inicio = dto.inicio;
  input.fim = dto.fim;
  input.motivo = dto.motivo ?? null;
  return input;
});

export const porPeriodoInputDtoToQuery = createMapper<
  CalendarioIndisponibilidadeAmbientePorPeriodoQueryRestDto,
  CalendarioIndisponibilidadeAmbientePorPeriodoQuery
>((dto) => ({
  ambienteId: dto.ambienteId,
  dateStart: dto.dateStart,
  dateEnd: dto.dateEnd,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CalendarioIndisponibilidadeAmbienteFindOneQueryResult,
  CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto
>((output) => {
  const dto = new CalendarioIndisponibilidadeAmbienteFindOneOutputRestDto();
  dto.id = output.id;
  dto.ambiente = AmbienteRestMapper.findOneQueryResultToOutputDto.map(output.ambiente);
  dto.tipo = output.tipo;
  dto.diaSemana = output.diaSemana;
  dto.data = output.data;
  dto.inicio = output.inicio;
  dto.fim = output.fim;
  dto.motivo = output.motivo;
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});

export const listQueryResultToListOutputDto = createListMapper(
  CalendarioIndisponibilidadeAmbienteListOutputRestDto,
  findOneQueryResultToOutputDto,
);
