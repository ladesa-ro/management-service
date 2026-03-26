import {
  ModalidadeCreateCommand,
  ModalidadeFindOneQuery,
  type ModalidadeFindOneQueryResult,
  ModalidadeListQuery,
  ModalidadeUpdateCommand,
} from "@/modules/ensino/modalidade";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type ModalidadeCreateInputGraphQlDto,
  ModalidadeFindOneOutputGraphQlDto,
  type ModalidadeListInputGraphQlDto,
  ModalidadeListOutputGraphQlDto,
  type ModalidadeUpdateInputGraphQlDto,
} from "./modalidade.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<string, ModalidadeFindOneQuery>((id) => {
  const query = new ModalidadeFindOneQuery();
  query.id = id;
  return query;
});

export function listInputDtoToListQuery(
  dto: ModalidadeListInputGraphQlDto | null,
): ModalidadeListQuery | null {
  if (!dto) return null;
  return createPaginatedInputMapper<ModalidadeListInputGraphQlDto, ModalidadeListQuery>(
    ModalidadeListQuery,
    (source, query) => {
      into(query).field("filter.id").from(source, "filterId");
    },
  ).map(dto);
}

export const createInputDtoToCreateCommand = createMapper<
  ModalidadeCreateInputGraphQlDto,
  ModalidadeCreateCommand
>((dto) => {
  const command = new ModalidadeCreateCommand();
  into(command).from(dto).field("nome").field("slug");
  return command;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { id: string; dto: ModalidadeUpdateInputGraphQlDto },
  ModalidadeFindOneQuery & ModalidadeUpdateCommand
>(({ id, dto }) => ({
  id,
  nome: dto.nome,
  slug: dto.slug,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  ModalidadeFindOneQueryResult,
  ModalidadeFindOneOutputGraphQlDto
>((queryResult) => ({
  id: queryResult.id,
  nome: queryResult.nome,
  slug: queryResult.slug,
  dateCreated: new Date(queryResult.dateCreated),
  dateUpdated: new Date(queryResult.dateUpdated),
  dateDeleted: queryResult.dateDeleted ? new Date(queryResult.dateDeleted) : null,
}));

export const listQueryResultToListOutputDto = createListMapper(
  ModalidadeListOutputGraphQlDto,
  findOneQueryResultToOutputDto,
);
