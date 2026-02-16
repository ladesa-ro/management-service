import {
  ImagemFindOneInputDto,
  ImagemFindOneOutputDto,
  ImagemListInputDto,
} from "@/modules/base/armazenamento/imagem";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/server/nest/shared/mappers";
import { ImagemFindOneOutputRestDto, ImagemListOutputRestDto } from "./imagem.rest.dto";

export class ImagemRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(ImagemFindOneInputDto);

  static toListInput = createListInputMapper(ImagemListInputDto, ["filter.id"]);

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: ImagemFindOneOutputDto): ImagemFindOneOutputRestDto {
    const dto = new ImagemFindOneOutputRestDto();
    dto.id = output.id;
    dto.descricao = output.descricao;
    mapDatedFields(dto, output);
    // Note: versoes mapping would need to be done by the consumer
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    ImagemListOutputRestDto,
    ImagemRestMapper.toFindOneOutputDto,
  );
}
