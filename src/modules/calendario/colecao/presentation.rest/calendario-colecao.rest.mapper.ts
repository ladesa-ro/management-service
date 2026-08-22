import * as UsuarioRestMapper from "@/modules/acesso/usuario/presentation.rest/usuario.rest.mapper";
import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import type { CalendarioColecaoVisibilidade } from "../domain/calendario-colecao.types";
import { CalendarioColecaoCreateCommand } from "../domain/commands/calendario-colecao-create.command";
import type { CalendarioColecaoTransferirDonoCommand } from "../domain/commands/calendario-colecao-transferir-dono.command";
import type { CalendarioColecaoUpdateCommand } from "../domain/commands/calendario-colecao-update.command";
import { CalendarioColecaoFindOneQuery } from "../domain/queries/calendario-colecao-find-one.query";
import type { CalendarioColecaoFindOneQueryResult } from "../domain/queries/calendario-colecao-find-one.query.result";
import { CalendarioColecaoListQuery } from "../domain/queries/calendario-colecao-list.query";
import {
  type CalendarioColecaoCreateInputRestDto,
  type CalendarioColecaoFindOneInputRestDto,
  CalendarioColecaoFindOneOutputRestDto,
  type CalendarioColecaoListInputRestDto,
  CalendarioColecaoListOutputRestDto,
  type CalendarioColecaoTransferirDonoInputRestDto,
  type CalendarioColecaoUpdateInputRestDto,
} from "./calendario-colecao.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  CalendarioColecaoFindOneInputRestDto,
  CalendarioColecaoFindOneQuery
>((dto) => {
  const input = new CalendarioColecaoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  CalendarioColecaoListInputRestDto,
  CalendarioColecaoListQuery
>(CalendarioColecaoListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.campus.id").from(dto);
  into(query).field("filter.visibilidade").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  CalendarioColecaoCreateInputRestDto,
  CalendarioColecaoCreateCommand
>((dto) => {
  const input = new CalendarioColecaoCreateCommand();
  input.nome = dto.nome;
  input.cor = dto.cor ?? null;
  input.campus = dto.campus ? { id: dto.campus.id } : null;
  input.visibilidade = dto.visibilidade as CalendarioColecaoVisibilidade | undefined;
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: CalendarioColecaoFindOneInputRestDto; dto: CalendarioColecaoUpdateInputRestDto },
  CalendarioColecaoFindOneQuery & CalendarioColecaoUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  cor: dto.cor !== undefined ? (dto.cor ?? null) : undefined,
  campus: dto.campus !== undefined ? (dto.campus ? { id: dto.campus.id } : null) : undefined,
  visibilidade: dto.visibilidade as CalendarioColecaoVisibilidade | undefined,
}));

export const transferirDonoInputDtoToTransferirDonoCommand = createMapper<
  { params: CalendarioColecaoFindOneInputRestDto; dto: CalendarioColecaoTransferirDonoInputRestDto },
  CalendarioColecaoFindOneQuery & CalendarioColecaoTransferirDonoCommand
>(({ params, dto }) => ({
  id: params.id,
  novoDonoId: dto.novoDonoId,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CalendarioColecaoFindOneQueryResult,
  CalendarioColecaoFindOneOutputRestDto
>((output) => {
  const dto = new CalendarioColecaoFindOneOutputRestDto();
  dto.id = output.id;
  dto.dono = UsuarioRestMapper.findOneQueryResultToOutputDto.map(output.dono);
  dto.campus = output.campus
    ? CampusRestMapper.findOneQueryResultToOutputDto.map(output.campus)
    : null;
  dto.nome = output.nome;
  dto.cor = output.cor;
  dto.visibilidade = output.visibilidade;
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});

export const listQueryResultToListOutputDto = createListMapper(
  CalendarioColecaoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
