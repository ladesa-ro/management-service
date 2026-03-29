import {
  EmpresaCreateCommand,
  EmpresaFindOneQuery,
  type EmpresaFindOneQueryResult,
  EmpresaListQuery,
  EmpresaUpdateCommand,
} from "@/modules/estagio/empresa";
import * as EnderecoRestMapper from "@/modules/localidades/endereco/presentation.rest/endereco.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type EmpresaCreateInputRestDto,
  type EmpresaFindOneInputRestDto,
  EmpresaFindOneOutputRestDto,
  type EmpresaListInputRestDto,
  EmpresaListOutputRestDto,
  type EmpresaUpdateInputRestDto,
} from "./empresa.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  EmpresaFindOneInputRestDto,
  EmpresaFindOneQuery
>((dto) => {
  const input = new EmpresaFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  EmpresaListInputRestDto,
  EmpresaListQuery
>(EmpresaListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.cnpj").from(dto);
  into(query).field("filter.nomeFantasia").from(dto);
  into(query).field("filter.endereco.id").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  EmpresaCreateInputRestDto,
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
  { params: EmpresaFindOneInputRestDto; dto: EmpresaUpdateInputRestDto },
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
  EmpresaFindOneOutputRestDto
>((output) => ({
  id: output.id,
  razaoSocial: output.razaoSocial,
  nomeFantasia: output.nomeFantasia,
  cnpj: output.cnpj,
  telefone: output.telefone,
  email: output.email,
  endereco: EnderecoRestMapper.findOneQueryResultToOutputDto.mapOptional(output.endereco),
  ativo: output.ativo,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  EmpresaListOutputRestDto,
  findOneQueryResultToOutputDto,
);
