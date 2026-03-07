import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao";
import {
  OfertaFormacaoNivelFormacaoCreateInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneOutputRestDto,
  OfertaFormacaoNivelFormacaoListOutputRestDto,
  OfertaFormacaoNivelFormacaoUpdateInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/OfertaFormacaoNivelFormacaoRestDto";
import { NivelFormacaoRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/NivelFormacaoRestMapper";
import { OfertaFormacaoRestMapper } from "@/Ladesa.Management.Server.Api/Apis/Rest/Mappers/OfertaFormacaoRestMapper";

export class OfertaFormacaoNivelFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(OfertaFormacaoNivelFormacaoFindOneInputDto);

  static toListInput = createListInputMapper(OfertaFormacaoNivelFormacaoListInputDto, [
    "filter.id",
  ]);
  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoNivelFormacaoListOutputRestDto,
    OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto,
  );

  static toCreateInput(
    dto: OfertaFormacaoNivelFormacaoCreateInputRestDto,
  ): OfertaFormacaoNivelFormacaoCreateInputDto {
    const input = new OfertaFormacaoNivelFormacaoCreateInputDto();
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    input.nivelFormacao = { id: dto.nivelFormacao.id };
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toUpdateInput(
    params: OfertaFormacaoNivelFormacaoFindOneInputRestDto,
    dto: OfertaFormacaoNivelFormacaoUpdateInputRestDto,
  ): OfertaFormacaoNivelFormacaoFindOneInputDto & OfertaFormacaoNivelFormacaoUpdateInputDto {
    const input =
      new OfertaFormacaoNivelFormacaoFindOneInputDto() as OfertaFormacaoNivelFormacaoFindOneInputDto &
        OfertaFormacaoNivelFormacaoUpdateInputDto;
    input.id = params.id;
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    if (dto.nivelFormacao !== undefined) {
      input.nivelFormacao = { id: dto.nivelFormacao.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: OfertaFormacaoNivelFormacaoFindOneOutputDto,
  ): OfertaFormacaoNivelFormacaoFindOneOutputRestDto {
    const dto = new OfertaFormacaoNivelFormacaoFindOneOutputRestDto();
    dto.id = output.id;
    dto.ofertaFormacao = OfertaFormacaoRestMapper.toFindOneOutputDto(output.ofertaFormacao);
    dto.nivelFormacao = NivelFormacaoRestMapper.toFindOneOutputDto(output.nivelFormacao);
    mapDatedFields(dto, output);
    return dto;
  }
}
