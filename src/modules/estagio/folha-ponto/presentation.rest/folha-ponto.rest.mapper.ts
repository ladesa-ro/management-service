import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import type { FolhaPontoCreateCommand } from "../domain/commands/folha-ponto-create.command";
import type { FolhaPontoFindOneQueryResult, FolhaPontoListQueryResult } from "../domain/queries";
import { FolhaPontoListQuery } from "../domain/queries";
import {
  FolhaPontoCreateInputRestDto,
  FolhaPontoFindOneOutputRestDto,
  FolhaPontoListInputRestDto,
  FolhaPontoListOutputRestDto,
} from "./folha-ponto.rest.dto";

export const createInputDtoToCreateCommand = createMapper<
  FolhaPontoCreateInputRestDto,
  FolhaPontoCreateCommand
>((dto) => {
  return {
    estagio: { id: dto.estagio.id },
    data: dto.data,
    horaInicio: dto.horaInicio,
    horaFim: dto.horaFim,
    observacoes: dto.observacoes ?? null,
  };
});

export const findOneQueryResultToOutputDto = createMapper<
  FolhaPontoFindOneQueryResult,
  FolhaPontoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  estagio: { id: output.estagio.id },
  data: output.data,
  horaInicio: output.horaInicio,
  horaFim: output.horaFim,
  quantidadeHoras: output.quantidadeHoras,
  observacoes: output.observacoes,
  status: output.status,
  dataSolicitacao: output.dataSolicitacao,
  dataAprovacao: output.dataAprovacao,
  dataRejeicao: output.dataRejeicao,
}));

export const listInputDtoToListQuery = createPaginatedInputMapper<
  FolhaPontoListInputRestDto,
  FolhaPontoListQuery
>(FolhaPontoListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.status").from(dto);
  into(query).field("filter.estagio.id").from(dto);
});

export const listQueryResultToListOutputDto = createListMapper(
  FolhaPontoListOutputRestDto,
  findOneQueryResultToOutputDto,
);

