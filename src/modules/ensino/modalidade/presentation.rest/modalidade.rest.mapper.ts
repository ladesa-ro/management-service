import {
  ModalidadeCreateCommand,
  ModalidadeFindOneQuery,
  type ModalidadeFindOneQueryResult,
  ModalidadeListQuery,
  ModalidadeUpdateCommand,
} from "@/modules/ensino/modalidade";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type ModalidadeCreateInputRestDto,
  type ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
  type ModalidadeListInputRestDto,
  ModalidadeListOutputRestDto,
  type ModalidadeUpdateInputRestDto,
} from "./modalidade.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneQuery
>((dto) => {
  const query = new ModalidadeFindOneQuery();
  query.id = dto.id;
  return query;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  ModalidadeListInputRestDto,
  ModalidadeListQuery
>(ModalidadeListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  ModalidadeCreateInputRestDto,
  ModalidadeCreateCommand
>((dto) => {
  const command = new ModalidadeCreateCommand();
  into(command).from(dto).field("nome").field("slug");
  return command;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: ModalidadeFindOneInputRestDto; dto: ModalidadeUpdateInputRestDto },
  ModalidadeFindOneQuery & ModalidadeUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  slug: dto.slug,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  ModalidadeFindOneQueryResult,
  ModalidadeFindOneOutputRestDto
>((queryResult) => ({
  id: queryResult.id,
  nome: queryResult.nome,
  slug: queryResult.slug,
  dateCreated: queryResult.dateCreated,
  dateUpdated: queryResult.dateUpdated,
  dateDeleted: queryResult.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  ModalidadeListOutputRestDto,
  findOneQueryResultToOutputDto,
);
