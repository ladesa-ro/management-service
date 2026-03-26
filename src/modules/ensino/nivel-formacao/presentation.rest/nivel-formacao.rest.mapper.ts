import {
  NivelFormacaoCreateCommand,
  NivelFormacaoFindOneQuery,
  type NivelFormacaoFindOneQueryResult,
  NivelFormacaoListQuery,
  NivelFormacaoUpdateCommand,
} from "@/modules/ensino/nivel-formacao";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
  type NivelFormacaoCreateInputRestDto,
  type NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
  type NivelFormacaoListInputRestDto,
  NivelFormacaoListOutputRestDto,
  type NivelFormacaoUpdateInputRestDto,
} from "./nivel-formacao.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneQuery
>((dto) => {
  const input = new NivelFormacaoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  NivelFormacaoListInputRestDto,
  NivelFormacaoListQuery
>(NivelFormacaoListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filter.id");
});

export const createInputDtoToCreateCommand = createMapper<
  NivelFormacaoCreateInputRestDto,
  NivelFormacaoCreateCommand
>((dto) => {
  const input = new NivelFormacaoCreateCommand();
  input.slug = dto.slug;
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: NivelFormacaoFindOneInputRestDto; dto: NivelFormacaoUpdateInputRestDto },
  NivelFormacaoFindOneQuery & NivelFormacaoUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  slug: dto.slug,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  slug: output.slug,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  NivelFormacaoListOutputRestDto,
  findOneQueryResultToOutputDto,
);
