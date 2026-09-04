import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import type { RelatorioCreateCommand, RelatorioUpdateCommand } from "../domain/commands";
import type { RelatorioFindOneQueryResult } from "../domain/queries";
import { RelatorioListQuery } from "../domain/queries";
import {
  RelatorioCreateInputRestDto,
  RelatorioFindOneOutputRestDto,
  RelatorioListInputRestDto,
  RelatorioListOutputRestDto,
  RelatorioUpdateInputRestDto,
} from "./relatorio.rest.dto";

export const createInputDtoToCreateCommand = createMapper<
  RelatorioCreateInputRestDto,
  RelatorioCreateCommand
>((dto) => {
  return {
    estagio: { id: dto.estagio.id },
    arquivo: dto.arquivo ? { id: dto.arquivo.id } : null,
    conteudoJson: dto.conteudoJson ?? null,
  };
});

export const updateInputDtoToUpdateCommand = createMapper<
  RelatorioUpdateInputRestDto,
  RelatorioUpdateCommand
>((dto) => {
  return {
    arquivo: dto.arquivo ? { id: dto.arquivo.id } : null,
    conteudoJson: dto.conteudoJson ?? null,
  };
});

export const findOneQueryResultToOutputDto = createMapper<
  RelatorioFindOneQueryResult,
  RelatorioFindOneOutputRestDto
>((output) => ({
  id: output.id,
  estagio: { id: output.estagio.id },
  arquivo: output.arquivo
    ? {
        id: output.arquivo.id,
        name: output.arquivo.name ?? null,
        mimeType: output.arquivo.mimeType ?? null,
        sizeBytes: output.arquivo.sizeBytes ?? null,
      }
    : null,
  conteudoJson: output.conteudoJson ?? null,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listInputDtoToListQuery = createPaginatedInputMapper<
  RelatorioListInputRestDto,
  RelatorioListQuery
>(RelatorioListQuery, (dto, query) => {
  into(query)
    .field("filter.id" as any)
    .from(dto);
  into(query)
    .field("filter.estagio.id" as any)
    .from(dto);
  into(query)
    .field("filter.estagio.empresa.id" as any)
    .from(dto);
  into(query)
    .field("filter.estagio.status" as any)
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

  const status = dto["filter.status"] ?? dto["filter.estagio.status"];
  if (status !== undefined) {
    (query as any)["filter.estagio.status"] = status;
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
  RelatorioListOutputRestDto,
  findOneQueryResultToOutputDto,
);
