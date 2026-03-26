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
  type NivelFormacaoCreateInputGraphQlDto,
  NivelFormacaoFindOneOutputGraphQlDto,
  type NivelFormacaoListInputGraphQlDto,
  NivelFormacaoListOutputGraphQlDto,
  type NivelFormacaoUpdateInputGraphQlDto,
} from "./nivel-formacao.graphql.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toFindOneInput = createMapper<string, NivelFormacaoFindOneQuery>((id) => {
  const input = new NivelFormacaoFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<
  NivelFormacaoListInputGraphQlDto,
  NivelFormacaoListQuery
>(NivelFormacaoListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filterId");
});

export function toListInput(
  dto: NivelFormacaoListInputGraphQlDto | null,
): NivelFormacaoListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const toCreateInput = createMapper<
  NivelFormacaoCreateInputGraphQlDto,
  NivelFormacaoCreateCommand
>((dto) => {
  const input = new NivelFormacaoCreateCommand();
  input.slug = dto.slug;
  return input;
});

export const toUpdateInput = createMapper<
  { id: string; dto: NivelFormacaoUpdateInputGraphQlDto },
  NivelFormacaoFindOneQuery & NivelFormacaoUpdateCommand
>(({ id, dto }) => ({
  id,
  slug: dto.slug,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  slug: output.slug,
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const toListOutput = createListMapper(NivelFormacaoListOutputGraphQlDto, toFindOneOutput);
