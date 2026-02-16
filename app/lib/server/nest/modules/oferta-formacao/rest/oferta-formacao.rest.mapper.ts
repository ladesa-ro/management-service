import {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoUpdateInputDto,
} from "@/modules/ensino/oferta-formacao";
import { ModalidadeRestMapper } from "@/server/nest/modules/modalidade/rest";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
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

  static toFindOneInput = createFindOneInputMapper(OfertaFormacaoFindOneInputDto);

  static toListInput = createListInputMapper(OfertaFormacaoListInputDto, [
    "filter.id",
    "filter.modalidade.id",
  ]);

  static toCreateInput(dto: OfertaFormacaoCreateInputRestDto): OfertaFormacaoCreateInputDto {
    const input = new OfertaFormacaoCreateInputDto();
    input.nome = dto.nome;
    input.slug = dto.slug;
    input.modalidade = { id: dto.modalidade.id };
    return input;
  }

  static toUpdateInput(
    params: OfertaFormacaoFindOneInputRestDto,
    dto: OfertaFormacaoUpdateInputRestDto,
  ): OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto {
    const input = new OfertaFormacaoFindOneInputDto() as OfertaFormacaoFindOneInputDto &
      OfertaFormacaoUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
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
    output: OfertaFormacaoFindOneOutputDto,
  ): OfertaFormacaoFindOneOutputRestDto {
    const dto = new OfertaFormacaoFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    dto.modalidade = ModalidadeRestMapper.toFindOneOutputDto(output.modalidade);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoListOutputRestDto,
    OfertaFormacaoRestMapper.toFindOneOutputDto,
  );
}
