import {
  ModalidadeCreateCommand,
  ModalidadeFindOneQuery,
  type ModalidadeFindOneQueryResult,
  ModalidadeListQuery,
  ModalidadeUpdateCommand,
} from "@/modules/ensino/modalidade";
import { createListMapper, createMapper, createPaginatedInputMapper } from "@/shared/mapping";
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

export const toFindOneInput = createMapper<string, ModalidadeFindOneQuery>((id) => {
  const input = new ModalidadeFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<
  ModalidadeListInputGraphQlDto,
  ModalidadeListQuery
>(ModalidadeListQuery, (dto, query) => {
  if (dto.filterId !== undefined) query["filter.id"] = dto.filterId;
});

export function toListInput(dto: ModalidadeListInputGraphQlDto | null): ModalidadeListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const toCreateInput = createMapper<ModalidadeCreateInputGraphQlDto, ModalidadeCreateCommand>(
  (dto) => {
    const input = new ModalidadeCreateCommand();
    input.nome = dto.nome;
    input.slug = dto.slug;
    return input;
  },
);

export const toUpdateInput = createMapper<
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

export const toFindOneOutput = createMapper<
  ModalidadeFindOneQueryResult,
  ModalidadeFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  slug: output.slug,
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const toListOutput = createListMapper(ModalidadeListOutputGraphQlDto, toFindOneOutput);
