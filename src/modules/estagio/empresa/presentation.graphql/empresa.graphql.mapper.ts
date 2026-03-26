import {
  EmpresaCreateCommand,
  EmpresaFindOneQuery,
  type EmpresaFindOneQueryResult,
  EmpresaListQuery,
  EmpresaUpdateCommand,
} from "@/modules/estagio/empresa";
import * as EnderecoGraphqlMapper from "@/modules/localidades/endereco/presentation.graphql/endereco.graphql.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type EmpresaCreateInputGraphQlDto,
  EmpresaFindOneOutputGraphQlDto,
  type EmpresaListInputGraphQlDto,
  EmpresaListOutputGraphQlDto,
  type EmpresaUpdateInputGraphQlDto,
} from "./empresa.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

const listInputMapper = createPaginatedInputMapper<EmpresaListInputGraphQlDto, EmpresaListQuery>(
  EmpresaListQuery,
  (dto, query) => {
    into(query).field("filter.id").from(dto, "filterId");

    into(query).field("filter.cnpj").from(dto, "filterCnpj");

    into(query).field("filter.nomeFantasia").from(dto, "filterNomeFantasia");

    into(query).field("filter.endereco.id").from(dto, "filterEnderecoId");
  },
);

export const findOneInputDtoToFindOneQuery = createMapper<string, EmpresaFindOneQuery>((id) => {
  const input = new EmpresaFindOneQuery();
  input.id = id;
  return input;
});

export function listInputDtoToListQuery(
  dto: EmpresaListInputGraphQlDto | null,
): EmpresaListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  EmpresaCreateInputGraphQlDto,
  EmpresaCreateCommand
>((dto) => {
  const input = new EmpresaCreateCommand();
  input.razaoSocial = dto.razaoSocial;
  input.nomeFantasia = dto.nomeFantasia;
  input.cnpj = dto.cnpj;
  input.telefone = dto.telefone;
  input.email = dto.email;
  input.endereco = { id: dto.endereco.id };
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: { id: string }; dto: EmpresaUpdateInputGraphQlDto },
  EmpresaFindOneQuery & EmpresaUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  razaoSocial: dto.razaoSocial,
  nomeFantasia: dto.nomeFantasia,
  cnpj: dto.cnpj,
  telefone: dto.telefone,
  email: dto.email,
  endereco: dto.endereco ? { id: dto.endereco.id } : undefined,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  EmpresaFindOneQueryResult,
  EmpresaFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  razaoSocial: output.razaoSocial,
  nomeFantasia: output.nomeFantasia,
  cnpj: output.cnpj,
  telefone: output.telefone,
  email: output.email,
  endereco: EnderecoGraphqlMapper.findOneQueryResultToOutputDto.map(output.endereco),
  ativo: output.ativo,
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const listQueryResultToListOutputDto = createListMapper(
  EmpresaListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);
