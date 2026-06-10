import * as CidadeRestMapper from "@/modules/localidades/cidade/presentation.rest/cidade.rest.mapper";
import {
  EnderecoCreateCommand,
  type EnderecoListQuery,
  type EnderecoFindOneQueryResult,
  type EnderecoListQueryResult,
} from "@/modules/localidades/endereco";
import { createMapper, createListMapper } from "@/shared/mapping";
import { 
  EnderecoFindOneOutputRestDto, 
  EnderecoListOutputRestDto,
  type EnderecoInputRestDto,
  type EnderecoListInputRestDto
} from "./endereco.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const createInputDtoToCreateCommand = createMapper<
  EnderecoInputRestDto,
  EnderecoCreateCommand
>((dto) => {
  const input = new EnderecoCreateCommand();
  input.cep = dto.cep;
  input.logradouro = dto.logradouro;
  input.numero = dto.numero;
  input.bairro = dto.bairro;
  input.complemento = dto.complemento ?? null;
  input.pontoReferencia = dto.pontoReferencia ?? null;
  input.cidade = { id: dto.cidade.id };
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<{ params: { id: string }; dto: EnderecoInputRestDto }, { id: string; dto: EnderecoInputRestDto }>(
  ({ params, dto }) => {
    return { id: params.id, dto };
  }
);

export const listInputDtoToListQuery = createMapper<
  EnderecoListInputRestDto,
  EnderecoListQuery
>((dto) => {
  return {
    pagination: {
      page: dto.page,
      limit: dto.limit,
    },
    search: dto.search,
    sortBy: dto.sortBy,
    filter: {
      id: dto["filter.id"],
    },
  };
});

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  EnderecoFindOneQueryResult,
  EnderecoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  cep: output.cep,
  logradouro: output.logradouro,
  numero: output.numero,
  bairro: output.bairro,
  complemento: output.complemento,
  pontoReferencia: output.pontoReferencia,
  cidade: CidadeRestMapper.findOneQueryResultToOutputDto.map(output.cidade),
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  EnderecoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
