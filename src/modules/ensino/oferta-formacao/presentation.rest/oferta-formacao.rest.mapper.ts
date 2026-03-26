import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import * as ModalidadeRestMapper from "@/modules/ensino/modalidade/presentation.rest/modalidade.rest.mapper";
import * as NivelFormacaoRestMapper from "@/modules/ensino/nivel-formacao/presentation.rest/nivel-formacao.rest.mapper";
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
  type OfertaFormacaoCreateInputRestDto,
  type OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
  type OfertaFormacaoListInputRestDto,
  OfertaFormacaoListOutputRestDto,
  type OfertaFormacaoUpdateInputRestDto,
} from "./oferta-formacao.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const toFindOneInput = createMapper<
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneQuery
>((dto) => {
  const input = new OfertaFormacaoFindOneQuery();
  input.id = dto.id;
  return input;
});

export const toListInput = createPaginatedInputMapper<
  OfertaFormacaoListInputRestDto,
  OfertaFormacaoListQuery
>(OfertaFormacaoListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filter.id");
  mapField(query, "filter.modalidade.id", dto, "filter.modalidade.id");
  mapField(query, "filter.campus.id", dto, "filter.campus.id");
});

export const toCreateInput = createMapper<
  OfertaFormacaoCreateInputRestDto,
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
  { params: OfertaFormacaoFindOneInputRestDto; dto: OfertaFormacaoUpdateInputRestDto },
  OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
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
  OfertaFormacaoFindOneOutputRestDto
>((output) => ({
  id: output.id,
  nome: output.nome,
  slug: output.slug,
  duracaoPeriodoEmMeses: output.duracaoPeriodoEmMeses,
  modalidade: ModalidadeRestMapper.findOneQueryResultToOutputDto.map(output.modalidade),
  campus: CampusRestMapper.toFindOneOutput.map(output.campus),
  niveisFormacoes: (output.niveisFormacoes ?? []).map((nf) =>
    NivelFormacaoRestMapper.toFindOneOutput.map(nf),
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
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const toListOutput = createListMapper(OfertaFormacaoListOutputRestDto, toFindOneOutput);
