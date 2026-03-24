import { CampusGraphqlMapper } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import { ModalidadeGraphqlMapper } from "@/modules/ensino/modalidade/presentation.graphql/modalidade.graphql.mapper";
import { NivelFormacaoGraphqlMapper } from "@/modules/ensino/nivel-formacao/presentation.graphql/nivel-formacao.graphql.mapper";
import {
  OfertaFormacaoCreateCommand,
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoListQuery,
  OfertaFormacaoUpdateCommand,
} from "@/modules/ensino/oferta-formacao";
import { createListOutputMapper, mapDatedFields } from "@/shared/mapping";
import {
  OfertaFormacaoCreateInputGraphQlDto,
  OfertaFormacaoFindOneOutputGraphQlDto,
  OfertaFormacaoListInputGraphQlDto,
  OfertaFormacaoListOutputGraphQlDto,
  OfertaFormacaoUpdateInputGraphQlDto,
} from "./oferta-formacao.graphql.dto";

export class OfertaFormacaoGraphqlMapper {
  static toListInput(
    dto: OfertaFormacaoListInputGraphQlDto | null,
  ): OfertaFormacaoListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new OfertaFormacaoListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.modalidade.id"] = dto.filterModalidadeId;
    input["filter.campus.id"] = dto.filterCampusId;
    return input;
  }

  static toFindOneInput(id: string): OfertaFormacaoFindOneQuery {
    const input = new OfertaFormacaoFindOneQuery();
    input.id = id;
    return input;
  }

  static toCreateInput(dto: OfertaFormacaoCreateInputGraphQlDto): OfertaFormacaoCreateCommand {
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
  }

  static toUpdateInput(
    params: { id: string },
    dto: OfertaFormacaoUpdateInputGraphQlDto,
  ): OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand {
    const input = new OfertaFormacaoFindOneQuery() as OfertaFormacaoFindOneQuery &
      OfertaFormacaoUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    if (dto.duracaoPeriodoEmMeses !== undefined) {
      input.duracaoPeriodoEmMeses = dto.duracaoPeriodoEmMeses;
    }
    if (dto.modalidade !== undefined) {
      input.modalidade = { id: dto.modalidade.id };
    }
    if (dto.campus !== undefined) {
      input.campus = { id: dto.campus.id };
    }
    if (dto.niveisFormacoes !== undefined) {
      input.niveisFormacoes = dto.niveisFormacoes.map((nf) => ({ id: nf.id }));
    }
    if (dto.periodos !== undefined) {
      input.periodos = dto.periodos.map((p) => ({
        numeroPeriodo: p.numeroPeriodo,
        etapas: p.etapas.map((e) => ({ nome: e.nome, cor: e.cor })),
      }));
    }
    return input;
  }

  static toFindOneOutputDto(
    output: OfertaFormacaoFindOneQueryResult,
  ): OfertaFormacaoFindOneOutputGraphQlDto {
    const dto = new OfertaFormacaoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    dto.duracaoPeriodoEmMeses = output.duracaoPeriodoEmMeses;
    dto.modalidade = ModalidadeGraphqlMapper.toFindOneOutputDto(output.modalidade);
    dto.campus = CampusGraphqlMapper.toFindOneOutputDto(output.campus);
    dto.niveisFormacoes = (output.niveisFormacoes ?? []).map((nf) =>
      NivelFormacaoGraphqlMapper.toFindOneOutputDto(nf),
    );
    dto.periodos = (output.periodos ?? []).map((p) => ({
      id: p.id,
      numeroPeriodo: p.numeroPeriodo,
      etapas: (p.etapas ?? []).map((e) => ({
        id: e.id,
        nome: e.nome,
        cor: e.cor,
      })),
    }));
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoListOutputGraphQlDto,
    OfertaFormacaoGraphqlMapper.toFindOneOutputDto,
  );
}
