import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import type { FolhaPontoCreateCommand } from "../domain/commands/folha-ponto-create.command";
import { FolhaPontoStatus } from "../domain/folha-ponto";
import type { FolhaPontoFindOneQueryResult } from "../domain/queries";
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
  status: output.status as FolhaPontoStatus,
  dataSolicitacao: output.dataSolicitacao,
  dataAprovacao: output.dataAprovacao,
  dataRejeicao: output.dataRejeicao,
}));

export const listInputDtoToListQuery = createPaginatedInputMapper<
  FolhaPontoListInputRestDto,
  FolhaPontoListQuery
>(FolhaPontoListQuery, (dto, query) => {
  into(query)
    .field("filter.id" as any)
    .from(dto);
  into(query)
    .field("filter.status" as any)
    .from(dto);
  into(query)
    .field("filter.data" as any)
    .from(dto);
  into(query)
    .field("filter.estagio.id" as any)
    .from(dto);
  into(query)
    .field("filter.estagio.empresa.id" as any)
    .from(dto);
  into(query)
    .field("filter.estagio.estagiario.id" as any)
    .from(dto);
  into(query)
    .field("filter.estagio.estagiario.perfil.usuario.matricula" as any)
    .from(dto);
  into(query)
    .field("filter.estagio.estagiario.perfil.usuario.nome" as any)
    .from(dto);

  const empresaId = dto["filter.empresa.id"] ?? dto["filter.estagio.empresa.id"];
  if (empresaId !== undefined) {
    (query as any)["filter.estagio.empresa.id"] = empresaId;
  }

  const estagiarioId = dto["filter.estagiario.id"] ?? dto["filter.estagio.estagiario.id"];
  if (estagiarioId !== undefined) {
    (query as any)["filter.estagio.estagiario.id"] = estagiarioId;
  }

  const matricula =
    dto["filter.matricula"] ?? dto["filter.estagio.estagiario.perfil.usuario.matricula"];
  if (matricula !== undefined) {
    (query as any)["filter.estagio.estagiario.perfil.usuario.matricula"] = matricula;
  }

  const nome = dto["filter.nome"] ?? dto["filter.estagio.estagiario.perfil.usuario.nome"];
  if (nome !== undefined) {
    (query as any)["filter.estagio.estagiario.perfil.usuario.nome"] = nome;
  }
});

export const listQueryResultToListOutputDto = createListMapper(
  FolhaPontoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
