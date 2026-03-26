import * as CampusGraphqlMapper from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import * as ModalidadeGraphqlMapper from "@/modules/ensino/modalidade/presentation.graphql/modalidade.graphql.mapper";
import * as NivelFormacaoGraphqlMapper from "@/modules/ensino/nivel-formacao/presentation.graphql/nivel-formacao.graphql.mapper";
import {
  OfertaFormacaoCreateCommand,
  OfertaFormacaoFindOneQuery,
  type OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoListQuery,
  OfertaFormacaoUpdateCommand,
} from "@/modules/ensino/oferta-formacao";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
  type OfertaFormacaoCreateInputGraphQlDto,
  OfertaFormacaoFindOneOutputGraphQlDto,
  type OfertaFormacaoListInputGraphQlDto,
  OfertaFormacaoListOutputGraphQlDto,
  type OfertaFormacaoUpdateInputGraphQlDto,
} from "./oferta-formacao.graphql.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const toFindOneInput = createMapper<string, OfertaFormacaoFindOneQuery>((id) => {
  const input = new OfertaFormacaoFindOneQuery();
  input.id = id;
  return input;
});

const listInputMapper = createPaginatedInputMapper<
  OfertaFormacaoListInputGraphQlDto,
  OfertaFormacaoListQuery
>(OfertaFormacaoListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filterId");
  mapField(query, "filter.modalidade.id", dto, "filterModalidadeId");
  mapField(query, "filter.campus.id", dto, "filterCampusId");
});

export function toListInput(
  dto: OfertaFormacaoListInputGraphQlDto | null,
): OfertaFormacaoListQuery | null {
  if (!dto) return null;
  return listInputMapper.map(dto);
}

export const toCreateInput = createMapper<
  OfertaFormacaoCreateInputGraphQlDto,
  OfertaFormacaoCreateCommand
>((dto) => {
  const input = new OfertaFormacaoCreateCommand();
  input.nome = dto.nome;
  input.slug = dto.slug;
  input.duracaoPeriodoEmMeses = dto.duracaoPeriodoEmMeses;
  input.modalidade = { id: dto.modalidade.id };
  input.campus = { id: dto.campus.id };
  input.niveisFormacoes = dto.niveisFormacoes.map((nf) => ({ id: nf.id }));
  input.periodos = dto.periodos.map((p) => ({
    numeroPeriodo: p.numeroPeriodo,
    etapas: p.etapas.map((e) => ({ nome: e.nome, cor: e.cor })),
  }));
  return input;
});

export const toUpdateInput = createMapper<
  { id: string; dto: OfertaFormacaoUpdateInputGraphQlDto },
  OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand
>(({ id, dto }) => ({
  id,
  nome: dto.nome,
  slug: dto.slug,
  duracaoPeriodoEmMeses: dto.duracaoPeriodoEmMeses,
  modalidade: dto.modalidade ? { id: dto.modalidade.id } : undefined,
  campus: dto.campus ? { id: dto.campus.id } : undefined,
  niveisFormacoes: dto.niveisFormacoes
    ? dto.niveisFormacoes.map((nf) => ({ id: nf.id }))
    : undefined,
  periodos: dto.periodos
    ? dto.periodos.map((p) => ({
        numeroPeriodo: p.numeroPeriodo,
        etapas: p.etapas.map((e) => ({ nome: e.nome, cor: e.cor })),
      }))
    : undefined,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<
  OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoFindOneOutputGraphQlDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  slug: output.slug,
  duracaoPeriodoEmMeses: output.duracaoPeriodoEmMeses,
  modalidade: ModalidadeGraphqlMapper.toFindOneOutput.map(output.modalidade),
  campus: CampusGraphqlMapper.toFindOneOutput.map(output.campus),
  niveisFormacoes: (output.niveisFormacoes ?? []).map((nf) =>
    NivelFormacaoGraphqlMapper.toFindOneOutput.map(nf),
  ),
  periodos: (output.periodos ?? []).map((p) => ({
    id: p.id,
    numeroPeriodo: p.numeroPeriodo,
    etapas: (p.etapas ?? []).map((e) => ({
      id: e.id,
      nome: e.nome,
      cor: e.cor,
    })),
  })),
  dateCreated: new Date(output.dateCreated),
  dateUpdated: new Date(output.dateUpdated),
  dateDeleted: output.dateDeleted ? new Date(output.dateDeleted) : null,
}));

export const toListOutput = createListMapper(OfertaFormacaoListOutputGraphQlDto, toFindOneOutput);
