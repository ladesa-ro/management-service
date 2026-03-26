import {
  ModalidadeCreateCommand,
  ModalidadeFindOneQuery,
  type ModalidadeFindOneQueryResult,
  ModalidadeListQuery,
  ModalidadeUpdateCommand,
} from "@/modules/ensino/modalidade";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
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

export const toFindOneInput = createMapper<ModalidadeFindOneInputRestDto, ModalidadeFindOneQuery>(
  (dto) => {
    const input = new ModalidadeFindOneQuery();
    input.id = dto.id;
    return input;
  },
);

export const toListInput = createPaginatedInputMapper<
  ModalidadeListInputRestDto,
  ModalidadeListQuery
>(ModalidadeListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filter.id");
});

export const toCreateInput = createMapper<ModalidadeCreateInputRestDto, ModalidadeCreateCommand>(
  (dto) => {
    const input = new ModalidadeCreateCommand();
    input.nome = dto.nome;
    input.slug = dto.slug;
    return input;
  },
);

export const toUpdateInput = createMapper<
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

export const toFindOneOutput = createMapper<
  ModalidadeFindOneQueryResult,
  ModalidadeFindOneOutputRestDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  slug: output.slug,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const toListOutput = createListMapper(ModalidadeListOutputRestDto, toFindOneOutput);
