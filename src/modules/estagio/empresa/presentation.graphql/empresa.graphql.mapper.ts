import {
  EmpresaCreateCommand,
  EmpresaFindOneQuery,
  type EmpresaFindOneQueryResult,
  EmpresaListQuery,
  EmpresaUpdateCommand,
} from "@/modules/estagio/empresa";
import * as EnderecoGraphqlMapper from "@/modules/localidades/endereco/presentation.graphql/endereco.graphql.mapper";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
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
    mapField(query, "filter.id", dto, "filterId");
    mapField(query, "filter.cnpj", dto, "filterCnpj");
    mapField(query, "filter.nomeFantasia", dto, "filterNomeFantasia");
    mapField(query, "filter.endereco.id", dto, "filterEnderecoId");
  },
);

export const toFindOneInput = createMapper<string, EmpresaFindOneQuery>((id) => {
  const input = new EmpresaFindOneQuery();
  input.id = id;
  return input;
});

export function toListInput(dto: EmpresaListInputGraphQlDto | null): EmpresaListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const toCreateInput = createMapper<EmpresaCreateInputGraphQlDto, EmpresaCreateCommand>(
  (dto) => {
    const input = new EmpresaCreateCommand();
    input.razaoSocial = dto.razaoSocial;
    input.nomeFantasia = dto.nomeFantasia;
    input.cnpj = dto.cnpj;
    input.telefone = dto.telefone;
    input.email = dto.email;
    input.endereco = { id: dto.endereco.id };
    return input;
  },
);

export const toUpdateInput = createMapper<
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

export const toFindOneOutput = createMapper<
  EmpresaFindOneQueryResult,
  EmpresaFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  razaoSocial: output.razaoSocial,
  nomeFantasia: output.nomeFantasia,
  cnpj: output.cnpj,
  telefone: output.telefone,
  email: output.email,
  endereco: EnderecoGraphqlMapper.toFindOneOutput.map(output.endereco),
  ativo: output.ativo,
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const toListOutput = createListMapper(EmpresaListOutputGraphQlDto, toFindOneOutput);
