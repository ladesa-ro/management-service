import { NivelFormacaoRestMapper } from "@/modules/ensino/nivel-formacao/presentation/rest";
import { OfertaFormacaoRestMapper } from "@/modules/ensino/oferta-formacao/presentation/rest";
import {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "@/modules/ensino/oferta-formacao-nivel-formacao";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import {
  OfertaFormacaoNivelFormacaoCreateInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneInputRestDto,
  OfertaFormacaoNivelFormacaoFindOneOutputRestDto,
  OfertaFormacaoNivelFormacaoListOutputRestDto,
  OfertaFormacaoNivelFormacaoUpdateInputRestDto,
} from "./oferta-formacao-nivel-formacao.rest.dto";

export class OfertaFormacaoNivelFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(OfertaFormacaoNivelFormacaoFindOneInputDto);

  static toListInput = createListInputMapper(OfertaFormacaoNivelFormacaoListInputDto, [
    "filter.id",
  ]);

  static toCreateInput(
    dto: OfertaFormacaoNivelFormacaoCreateInputRestDto,
  ): OfertaFormacaoNivelFormacaoCreateInputDto {
    const input = new OfertaFormacaoNivelFormacaoCreateInputDto();
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    input.nivelFormacao = { id: dto.nivelFormacao.id };
    return input;
  }

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

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

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

  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoNivelFormacaoListOutputRestDto,
    OfertaFormacaoNivelFormacaoRestMapper.toFindOneOutputDto,
  );
}
