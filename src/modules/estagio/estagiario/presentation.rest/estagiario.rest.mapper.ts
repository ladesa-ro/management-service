import * as PerfilRestMapper from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.mapper";
import * as CursoRestMapper from "@/modules/ensino/curso/presentation.rest/curso.rest.mapper";
import {
  EstagiarioCreateCommand,
  EstagiarioUpdateCommand,
} from "@/modules/estagio/estagiario/domain/commands";
import {
  EstagiarioFindOneQuery,
  type EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
} from "@/modules/estagio/estagiario/domain/queries";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type EstagiarioCreateInputRestDto,
  type EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  type EstagiarioListInputRestDto,
  EstagiarioListOutputRestDto,
  type EstagiarioUpdateInputRestDto,
} from "./estagiario.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneQuery
>((dto) => {
  const input = new EstagiarioFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  EstagiarioListInputRestDto,
  EstagiarioListQuery
>(EstagiarioListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.perfil.id").from(dto);
  into(query).field("filter.curso.id").from(dto);
  into(query).field("filter.periodo").from(dto, "filterPeriodo");
});

export const createInputDtoToCreateCommand = createMapper<
  EstagiarioCreateInputRestDto,
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
  { params: EstagiarioFindOneInputRestDto; dto: EstagiarioUpdateInputRestDto },
  EstagiarioFindOneQuery & EstagiarioUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
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
  EstagiarioFindOneOutputRestDto
>((output) => ({
  id: output.id,
  perfil: PerfilRestMapper.findOneQueryResultToOutputDto.mapOptional(output.perfil),
  curso: CursoRestMapper.findOneQueryResultToOutputDto.mapOptional(output.curso),
  periodo: output.periodo,
  telefone: output.telefone,
  emailInstitucional: output.emailInstitucional,
  dataNascimento: output.dataNascimento,
  ativo: output.ativo,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  EstagiarioListOutputRestDto,
  findOneQueryResultToOutputDto,
);
