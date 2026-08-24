import * as PerfilRestMapper from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import type { CalendarioIndisponibilidadeProfessorTipo } from "../domain/calendario-indisponibilidade-professor.types";
import { CalendarioIndisponibilidadeProfessorCreateCommand } from "../domain/commands/calendario-indisponibilidade-professor-create.command";
import { CalendarioIndisponibilidadeProfessorFindOneQuery } from "../domain/queries/calendario-indisponibilidade-professor-find-one.query";
import type { CalendarioIndisponibilidadeProfessorFindOneQueryResult } from "../domain/queries/calendario-indisponibilidade-professor-find-one.query.result";
import { CalendarioIndisponibilidadeProfessorListQuery } from "../domain/queries/calendario-indisponibilidade-professor-list.query";
import type { CalendarioIndisponibilidadeProfessorPorPeriodoQuery } from "../domain/queries/calendario-indisponibilidade-professor-por-periodo.query";
import {
  type CalendarioIndisponibilidadeProfessorCreateInputRestDto,
  type CalendarioIndisponibilidadeProfessorFindOneInputRestDto,
  CalendarioIndisponibilidadeProfessorFindOneOutputRestDto,
  type CalendarioIndisponibilidadeProfessorListInputRestDto,
  CalendarioIndisponibilidadeProfessorListOutputRestDto,
  type CalendarioIndisponibilidadeProfessorPorPeriodoQueryRestDto,
} from "./calendario-indisponibilidade-professor.rest.dto";

export const findOneInputDtoToFindOneQuery = createMapper<
  CalendarioIndisponibilidadeProfessorFindOneInputRestDto,
  CalendarioIndisponibilidadeProfessorFindOneQuery
>((dto) => {
  const input = new CalendarioIndisponibilidadeProfessorFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  CalendarioIndisponibilidadeProfessorListInputRestDto,
  CalendarioIndisponibilidadeProfessorListQuery
>(CalendarioIndisponibilidadeProfessorListQuery, (dto, query) => {
  into(query).from(dto).field("filter.id").field("filter.perfil.id").field("filter.tipo");
});

export const createInputDtoToCreateCommand = createMapper<
  CalendarioIndisponibilidadeProfessorCreateInputRestDto,
  CalendarioIndisponibilidadeProfessorCreateCommand
>((dto) => {
  const input = new CalendarioIndisponibilidadeProfessorCreateCommand();
  input.perfil = { id: dto.perfil.id };
  input.tipo = dto.tipo as CalendarioIndisponibilidadeProfessorTipo;
  input.diaSemana = dto.diaSemana ?? null;
  input.data = dto.data ?? null;
  input.inicio = dto.inicio;
  input.fim = dto.fim;
  input.motivo = dto.motivo ?? null;
  return input;
});

export const porPeriodoInputDtoToQuery = createMapper<
  CalendarioIndisponibilidadeProfessorPorPeriodoQueryRestDto,
  CalendarioIndisponibilidadeProfessorPorPeriodoQuery
>((dto) => ({
  perfilId: dto.perfilId,
  dateStart: dto.dateStart,
  dateEnd: dto.dateEnd,
}));

export const findOneQueryResultToOutputDto = createMapper<
  CalendarioIndisponibilidadeProfessorFindOneQueryResult,
  CalendarioIndisponibilidadeProfessorFindOneOutputRestDto
>((output) => {
  const dto = new CalendarioIndisponibilidadeProfessorFindOneOutputRestDto();
  dto.id = output.id;
  dto.perfil = PerfilRestMapper.findOneQueryResultToOutputDto.map(output.perfil);
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
  CalendarioIndisponibilidadeProfessorListOutputRestDto,
  findOneQueryResultToOutputDto,
);
