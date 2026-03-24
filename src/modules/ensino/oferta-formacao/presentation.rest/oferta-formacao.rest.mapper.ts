import { CampusRestMapper } from "@/modules/ambientes/campus/presentation.rest";
import { ModalidadeRestMapper } from "@/modules/ensino/modalidade/presentation.rest";
import { NivelFormacaoRestMapper } from "@/modules/ensino/nivel-formacao/presentation.rest";
import {
  OfertaFormacaoCreateCommand,
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoListQuery,
  OfertaFormacaoUpdateCommand,
} from "@/modules/ensino/oferta-formacao";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/shared/mapping";
import {
  OfertaFormacaoCreateInputRestDto,
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
  OfertaFormacaoListOutputRestDto,
  OfertaFormacaoUpdateInputRestDto,
} from "./oferta-formacao.rest.dto";

export class OfertaFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(OfertaFormacaoFindOneQuery);

  static toListInput = createListInputMapper(OfertaFormacaoListQuery, [
    "filter.id",
    "filter.modalidade.id",
    "filter.campus.id",
  ]);

  static toCreateInput(dto: OfertaFormacaoCreateInputRestDto): OfertaFormacaoCreateCommand {
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
    params: OfertaFormacaoFindOneInputRestDto,
    dto: OfertaFormacaoUpdateInputRestDto,
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

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: OfertaFormacaoFindOneQueryResult,
  ): OfertaFormacaoFindOneOutputRestDto {
    const dto = new OfertaFormacaoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    dto.duracaoPeriodoEmMeses = output.duracaoPeriodoEmMeses;
    dto.modalidade = ModalidadeRestMapper.toFindOneOutputDto(output.modalidade);
    dto.campus = CampusRestMapper.toFindOneOutputDto(output.campus);
    dto.niveisFormacoes = (output.niveisFormacoes ?? []).map((nf) =>
      NivelFormacaoRestMapper.toFindOneOutputDto(nf),
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
    OfertaFormacaoListOutputRestDto,
    OfertaFormacaoRestMapper.toFindOneOutputDto,
  );
}
