import {
  NivelFormacaoCreateCommand,
  NivelFormacaoFindOneQuery,
  type NivelFormacaoFindOneQueryResult,
  NivelFormacaoListQuery,
  NivelFormacaoUpdateCommand,
} from "@/modules/ensino/nivel-formacao";
import { createListMapper, createMapper, createPaginatedInputMapper } from "@/shared/mapping";
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

export const toFindOneInput = createMapper<
  NivelFormacaoFindOneInputRestDto,
  NivelFormacaoFindOneQuery
>((dto) => {
  const input = new NivelFormacaoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const toListInput = createPaginatedInputMapper<
  NivelFormacaoListInputRestDto,
  NivelFormacaoListQuery
>(NivelFormacaoListQuery, (dto, query) => {
  if (dto["filter.id"] !== undefined) query["filter.id"] = dto["filter.id"];
});

export const toCreateInput = createMapper<
  NivelFormacaoCreateInputRestDto,
  NivelFormacaoCreateCommand
>((dto) => {
  const input = new NivelFormacaoCreateCommand();
  input.slug = dto.slug;
  return input;
});

export const toUpdateInput = createMapper<
  { params: NivelFormacaoFindOneInputRestDto; dto: NivelFormacaoUpdateInputRestDto },
  NivelFormacaoFindOneQuery & NivelFormacaoUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  slug: dto.slug,
}));

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<
  NivelFormacaoFindOneQueryResult,
  NivelFormacaoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  slug: output.slug,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const toListOutput = createListMapper(NivelFormacaoListOutputRestDto, toFindOneOutput);
