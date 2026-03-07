import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  ImagemFindOneInputDto,
  ImagemFindOneOutputDto,
  ImagemListInputDto,
} from "@/Ladesa.Management.Application/armazenamento/imagem";
import {
  ImagemFindOneOutputRestDto,
  ImagemListOutputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/ImagemRestDto";

export class ImagemRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(ImagemFindOneInputDto);

  static toListInput = createListInputMapper(ImagemListInputDto, ["filter.id"]);

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================
  static toListOutputDto = createListOutputMapper(
    ImagemListOutputRestDto,
    ImagemRestMapper.toFindOneOutputDto,
  );

  static toFindOneOutputDto(output: ImagemFindOneOutputDto): ImagemFindOneOutputRestDto {
    const dto = new ImagemFindOneOutputRestDto();
    dto.id = output.id;
    dto.descricao = output.descricao;
    mapDatedFields(dto, output);
    // Note: versoes mapping would need to be done by the consumer
    return dto;
  }
}
