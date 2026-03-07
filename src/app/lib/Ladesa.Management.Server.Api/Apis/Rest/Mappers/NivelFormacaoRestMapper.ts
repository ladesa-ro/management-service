import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/nivel-formacao";
import {
  NivelFormacaoCreateInputRestDto,
  NivelFormacaoFindOneOutputRestDto,
  NivelFormacaoListOutputRestDto,
  NivelFormacaoUpdateInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/NivelFormacaoRestDto";

export class NivelFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(NivelFormacaoFindOneInputDto);

  static toListInput = createListInputMapper(NivelFormacaoListInputDto, ["filter.id"]);

  static toCreateInput(dto: NivelFormacaoCreateInputRestDto): NivelFormacaoCreateInputDto {
    const input = new NivelFormacaoCreateInputDto();
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(dto: NivelFormacaoUpdateInputRestDto): NivelFormacaoUpdateInputDto {
    const input = new NivelFormacaoUpdateInputDto();
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: NivelFormacaoFindOneOutputDto,
  ): NivelFormacaoFindOneOutputRestDto {
    const dto = new NivelFormacaoFindOneOutputRestDto();
    dto.id = output.id;
    dto.slug = output.slug;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    NivelFormacaoListOutputRestDto,
    NivelFormacaoRestMapper.toFindOneOutputDto,
  );
}
