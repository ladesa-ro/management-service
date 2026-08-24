import * as UsuarioRestMapper from "@/modules/acesso/usuario/presentation.rest/usuario.rest.mapper";
import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import { createListMapper, createMapper, into } from "@/shared/mapping";
import type {
  CalendarioColecaoAcessoEscopo,
  CalendarioColecaoAcessoPapel,
} from "../domain/calendario-colecao-acesso.types";
import { CalendarioColecaoAcessoConcederCommand } from "../domain/commands/calendario-colecao-acesso-conceder.command";
import { CalendarioColecaoAcessoFindOneQuery } from "../domain/queries/calendario-colecao-acesso-find-one.query";
import type { CalendarioColecaoAcessoFindOneQueryResult } from "../domain/queries/calendario-colecao-acesso-find-one.query.result";
import { CalendarioColecaoAcessoListQuery } from "../domain/queries/calendario-colecao-acesso-list.query";
import {
  type CalendarioColecaoAcessoConcederInputRestDto,
  CalendarioColecaoAcessoFindOneOutputRestDto,
  type CalendarioColecaoAcessoFindOneParamsRestDto,
  type CalendarioColecaoAcessoListInputRestDto,
  CalendarioColecaoAcessoListOutputRestDto,
  type CalendarioColecaoAcessoParentParamsRestDto,
} from "./calendario-colecao-acesso.rest.dto";

export const findOneParamsInputDtoToFindOneQuery = createMapper<
  CalendarioColecaoAcessoFindOneParamsRestDto,
  CalendarioColecaoAcessoFindOneQuery
>((params) => {
  const input = new CalendarioColecaoAcessoFindOneQuery();
  input.id = params.id;
  return input;
});

export const concederInputDtoToConcederCommand = createMapper<
  {
    params: CalendarioColecaoAcessoParentParamsRestDto;
    dto: CalendarioColecaoAcessoConcederInputRestDto;
  },
  CalendarioColecaoAcessoConcederCommand
>(({ params, dto }) => {
  const input = new CalendarioColecaoAcessoConcederCommand();
  input.colecaoId = params.colecaoId;
  input.escopo = dto.escopo as CalendarioColecaoAcessoEscopo;
  input.usuario = dto.usuario ? { id: dto.usuario.id } : null;
  input.campus = dto.campus ? { id: dto.campus.id } : null;
  input.papel = dto.papel as CalendarioColecaoAcessoPapel;
  return input;
});

export const listInputDtoToListQuery = createMapper<
  {
    params: CalendarioColecaoAcessoParentParamsRestDto;
    dto: CalendarioColecaoAcessoListInputRestDto;
  },
  CalendarioColecaoAcessoListQuery
>(({ params, dto }) => {
  const query = new CalendarioColecaoAcessoListQuery();
  into(query).from(dto).field("page").field("limit").field("search").field("sortBy");
  into(query).field("filter.id").from(dto);
  into(query).field("filter.escopo").from(dto);
  query["filter.colecao.id"] = [params.colecaoId];
  return query;
});

export const findOneQueryResultToOutputDto = createMapper<
  CalendarioColecaoAcessoFindOneQueryResult,
  CalendarioColecaoAcessoFindOneOutputRestDto
>((output) => {
  const dto = new CalendarioColecaoAcessoFindOneOutputRestDto();
  dto.id = output.id;
  dto.colecaoId = output.colecao.id;
  dto.escopo = output.escopo;
  dto.usuario = output.usuario
    ? UsuarioRestMapper.findOneQueryResultToOutputDto.map(output.usuario)
    : null;
  dto.campus = output.campus
    ? CampusRestMapper.findOneQueryResultToOutputDto.map(output.campus)
    : null;
  dto.papel = output.papel;
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});

export const listQueryResultToListOutputDto = createListMapper(
  CalendarioColecaoAcessoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
