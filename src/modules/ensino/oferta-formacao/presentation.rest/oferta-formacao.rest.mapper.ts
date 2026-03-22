import { ModalidadeRestMapper } from "@/modules/ensino/modalidade/presentation.rest";
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
  ]);

  static toCreateInput(dto: OfertaFormacaoCreateInputRestDto): OfertaFormacaoCreateCommand {
    const input = new OfertaFormacaoCreateCommand();
    input.nome = dto.nome;
    input.slug = dto.slug;
    input.duracaoPeriodo = dto.duracaoPeriodo ?? null;
    input.modalidade = { id: dto.modalidade.id };
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
    if (dto.duracaoPeriodo !== undefined) {
      input.duracaoPeriodo = dto.duracaoPeriodo ?? null;
    }
    if (dto.modalidade !== undefined) {
      input.modalidade = { id: dto.modalidade.id };
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
    dto.duracaoPeriodo = output.duracaoPeriodo ?? null;
    dto.modalidade = ModalidadeRestMapper.toFindOneOutputDto(output.modalidade);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoListOutputRestDto,
    OfertaFormacaoRestMapper.toFindOneOutputDto,
  );
}
