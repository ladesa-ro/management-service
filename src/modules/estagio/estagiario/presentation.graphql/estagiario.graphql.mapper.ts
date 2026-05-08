import * as PerfilGraphqlMapper from "@/modules/acesso/usuario/perfil/presentation.graphql/perfil.graphql.mapper";
import * as CursoGraphqlMapper from "@/modules/ensino/curso/presentation.graphql/curso.graphql.mapper";
import {
  EstagiarioCreateCommand,
  EstagiarioFindOneQuery,
  type EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
  EstagiarioUpdateCommand,
} from "@/modules/estagio/estagiario";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type EstagiarioCreateInputGraphQlDto,
  EstagiarioFindOneOutputGraphQlDto,
  type EstagiarioListInputGraphQlDto,
  EstagiarioListOutputGraphQlDto,
  type EstagiarioUpdateInputGraphQlDto,
} from "./estagiario.graphql.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<string, EstagiarioFindOneQuery>((id) => {
  const input = new EstagiarioFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<
  EstagiarioListInputGraphQlDto,
  EstagiarioListQuery
>(EstagiarioListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto, "filterId");
  into(query).field("filter.perfil.id").from(dto, "filterPerfilId");
  into(query).field("filter.curso.id").from(dto, "filterCursoId");
  into(query).field("filter.periodo").from(dto, "filterPeriodo");
});

export function listInputDtoToListQuery(
  dto: EstagiarioListInputGraphQlDto | null,
): EstagiarioListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  EstagiarioCreateInputGraphQlDto,
  EstagiarioCreateCommand
>((dto) => ({
  perfil: { id: dto.perfil.id },
  curso: { id: dto.curso.id },
  periodo: dto.periodo,
  telefone: dto.telefone,
  emailInstitucional: dto.emailInstitucional,
  dataNascimento: dto.dataNascimento,
}));

export const updateInputDtoToUpdateCommand = createMapper<
  { id: string; dto: EstagiarioUpdateInputGraphQlDto },
  EstagiarioFindOneQuery & EstagiarioUpdateCommand
>(({ id, dto }) => ({
  id,
  perfil: dto.perfil ? { id: dto.perfil.id } : undefined,
  curso: dto.curso ? { id: dto.curso.id } : undefined,
  periodo: dto.periodo,
  telefone: dto.telefone,
  emailInstitucional: dto.emailInstitucional,
  dataNascimento: dto.dataNascimento,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  EstagiarioFindOneQueryResult,
  EstagiarioFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  perfil: PerfilGraphqlMapper.findOneQueryResultToOutputDto.map(output.perfil),
  curso: CursoGraphqlMapper.findOneQueryResultToOutputDto.map(output.curso),
  periodo: output.periodo,
  telefone: output.telefone,
  emailInstitucional: output.emailInstitucional,
  dataNascimento: output.dataNascimento,
  ativo: output.ativo,
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const listQueryResultToListOutputDto = createListMapper(
  EstagiarioListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);
