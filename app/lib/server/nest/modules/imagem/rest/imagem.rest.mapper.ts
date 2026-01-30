import {
  ImagemFindOneInput,
  ImagemFindOneOutput,
  ImagemListInput,
  ImagemListOutput,
} from "@/core/imagem";
import {
  ImagemFindOneInputDto,
  ImagemFindOneOutputDto,
  ImagemListInputDto,
  ImagemListOutputDto,
} from "./imagem.rest.dto";

export class ImagemRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: ImagemFindOneInputDto): ImagemFindOneInput {
    const input = new ImagemFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: ImagemListInputDto | null): ImagemListInput | null {
    if (!dto) {
      return null;
    }

    const input = new ImagemListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: ImagemFindOneOutput): ImagemFindOneOutputDto {
    const dto = new ImagemFindOneOutputDto();
    dto.id = output.id;
    dto.descricao = output.descricao;
    dto.dateCreated = output.dateCreated;
    dto.dateUpdated = output.dateUpdated;
    dto.dateDeleted = output.dateDeleted;
    // Note: versoes mapping would need to be done by the consumer
    return dto;
  }

  static toListOutputDto(output: ImagemListOutput): ImagemListOutputDto {
    const dto = new ImagemListOutputDto();
    dto.meta = {
      currentPage: output.meta.currentPage,
      totalPages: output.meta.totalPages,
      itemsPerPage: output.meta.itemsPerPage,
      totalItems: output.meta.totalItems,
      sortBy: output.meta.sortBy,
      filter: output.meta.filter,
      search: output.meta.search,
    };
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
