import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/modalidade";
import {
  ModalidadeCreateInputRestDto,
  ModalidadeFindOneInputRestDto,
  ModalidadeFindOneOutputRestDto,
  ModalidadeListOutputRestDto,
  ModalidadeUpdateInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/ModalidadeRestDto";

export class ModalidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(ModalidadeFindOneInputDto);

  static toListInput = createListInputMapper(ModalidadeListInputDto, ["filter.id"]);
  static toListOutputDto = createListOutputMapper(
    ModalidadeListOutputRestDto,
    ModalidadeRestMapper.toFindOneOutputDto,
  );

  static toCreateInput(dto: ModalidadeCreateInputRestDto): ModalidadeCreateInputDto {
    const input = new ModalidadeCreateInputDto();
    input.nome = dto.nome;
    input.slug = dto.slug;
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toUpdateInput(
    params: ModalidadeFindOneInputRestDto,
    dto: ModalidadeUpdateInputRestDto,
  ): ModalidadeFindOneInputDto & ModalidadeUpdateInputDto {
    const input = new ModalidadeFindOneInputDto() as ModalidadeFindOneInputDto &
      ModalidadeUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  static toFindOneOutputDto(output: ModalidadeFindOneOutputDto): ModalidadeFindOneOutputRestDto {
    const dto = new ModalidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    mapDatedFields(dto, output);
    return dto;
  }
}
