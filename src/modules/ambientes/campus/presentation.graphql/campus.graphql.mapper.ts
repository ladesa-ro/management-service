import {
  CampusCreateCommand,
  CampusFindOneQuery,
  type CampusFindOneQueryResult,
  CampusListQuery,
  CampusUpdateCommand,
} from "@/modules/ambientes/campus";
import * as EnderecoGraphqlMapper from "@/modules/localidades/endereco/presentation.graphql/endereco.graphql.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type CampusCreateInputGraphQlDto,
  CampusFindOneOutputGraphQlDto,
  type CampusListInputGraphQlDto,
  CampusListOutputGraphQlDto,
  type CampusUpdateInputGraphQlDto,
} from "./campus.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

const listInputMapper = createPaginatedInputMapper<CampusListInputGraphQlDto, CampusListQuery>(
  CampusListQuery,
  (dto, query) => {
    into(query).field("filter.id").from(dto, "filterId");
  },
);

export const findOneInputDtoToFindOneQuery = createMapper<string, CampusFindOneQuery>((id) => {
  const input = new CampusFindOneQuery();
  input.id = id;
  return input;
});

export function listInputDtoToListQuery(
  dto: CampusListInputGraphQlDto | null,
): CampusListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  CampusCreateInputGraphQlDto,
  CampusCreateCommand
>((dto) => {
  const input = new CampusCreateCommand();
  input.nomeFantasia = dto.nomeFantasia;
  input.razaoSocial = dto.razaoSocial;
  input.apelido = dto.apelido;
  input.cnpj = dto.cnpj;
  input.endereco = {
    cep: dto.endereco.cep,
    logradouro: dto.endereco.logradouro,
    numero: dto.endereco.numero,
    bairro: dto.endereco.bairro,
    complemento: dto.endereco.complemento ?? null,
    pontoReferencia: dto.endereco.pontoReferencia ?? null,
    cidade: { id: dto.endereco.cidade.id },
  };
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: { id: string }; dto: CampusUpdateInputGraphQlDto },
  CampusFindOneQuery & CampusUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nomeFantasia: dto.nomeFantasia,
  razaoSocial: dto.razaoSocial,
  apelido: dto.apelido,
  cnpj: dto.cnpj,
  endereco: dto.endereco
    ? {
        cep: dto.endereco.cep,
        logradouro: dto.endereco.logradouro,
        numero: dto.endereco.numero,
        bairro: dto.endereco.bairro,
        complemento: dto.endereco.complemento ?? null,
        pontoReferencia: dto.endereco.pontoReferencia ?? null,
        cidade: { id: dto.endereco.cidade.id },
      }
    : undefined,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  CampusFindOneQueryResult,
  CampusFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  nomeFantasia: output.nomeFantasia,
  razaoSocial: output.razaoSocial,
  apelido: output.apelido,
  cnpj: output.cnpj,
  endereco: EnderecoGraphqlMapper.findOneQueryResultToOutputDto.map(output.endereco),
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const listQueryResultToListOutputDto = createListMapper(
  CampusListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);
