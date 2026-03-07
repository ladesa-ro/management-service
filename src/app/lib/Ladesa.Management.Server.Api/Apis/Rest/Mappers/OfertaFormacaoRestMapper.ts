import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import {
  OfertaFormacaoCreateInputRestDto,
  OfertaFormacaoFindOneInputRestDto,
  OfertaFormacaoFindOneOutputRestDto,
  OfertaFormacaoListOutputRestDto,
  OfertaFormacaoUpdateInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/OfertaFormacaoRestDto";
import { ModalidadeRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/ModalidadeRestMapper";

export class OfertaFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(OfertaFormacaoFindOneInputDto);

  static toListInput = createListInputMapper(OfertaFormacaoListInputDto, [
    "filter.id",
    "filter.modalidade.id",
  ]);
  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoListOutputRestDto,
    OfertaFormacaoRestMapper.toFindOneOutputDto,
  );

  static toCreateInput(dto: OfertaFormacaoCreateInputRestDto): OfertaFormacaoCreateInputDto {
    const input = new OfertaFormacaoCreateInputDto();
    input.nome = dto.nome;
    input.slug = dto.slug;
    input.modalidade = { id: dto.modalidade.id };
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

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
}
