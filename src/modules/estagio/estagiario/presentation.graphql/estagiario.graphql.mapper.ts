import * as PerfilGraphqlMapper from "@/modules/acesso/usuario/perfil/presentation.graphql/perfil.graphql.mapper";
import * as CursoGraphqlMapper from "@/modules/ensino/curso/presentation.graphql/curso.graphql.mapper";
import * as TurmaGraphqlMapper from "@/modules/ensino/turma/presentation.graphql/turma.graphql.mapper";
import {
  EstagiarioCreateCommand,
  EstagiarioFindOneQuery,
  type EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
  EstagiarioUpdateCommand,
} from "@/modules/estagio/estagiario";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
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
  mapField(query, "filter.id", dto, "filterId");
  mapField(query, "filter.perfil.id", dto, "filterPerfilId");
  mapField(query, "filter.curso.id", dto, "filterCursoId");
  mapField(query, "filter.turma.id", dto, "filterTurmaId");
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
  turma: { id: dto.turma.id },
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
  turma: dto.turma ? { id: dto.turma.id } : undefined,
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
  turma: TurmaGraphqlMapper.findOneQueryResultToOutputDto.map(output.turma),
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
