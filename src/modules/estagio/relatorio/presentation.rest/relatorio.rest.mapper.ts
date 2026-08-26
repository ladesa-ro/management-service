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
});

export const listQueryResultToListOutputDto = createListMapper(
  RelatorioListOutputRestDto,
  findOneQueryResultToOutputDto,
);
