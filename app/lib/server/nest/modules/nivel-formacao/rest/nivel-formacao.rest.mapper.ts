import {
  NivelFormacaoCreateInput,
  NivelFormacaoFindOneInput,
  NivelFormacaoFindOneOutput,
  NivelFormacaoListInput,
  NivelFormacaoListOutput,
  NivelFormacaoUpdateInput,
} from "@/core/nivel-formacao";
import {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "./nivel-formacao.rest.dto";

export class NivelFormacaoRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: NivelFormacaoFindOneInputDto): NivelFormacaoFindOneInput {
    const input = new NivelFormacaoFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: NivelFormacaoListInputDto | null): NivelFormacaoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new NivelFormacaoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: NivelFormacaoCreateInputDto): NivelFormacaoCreateInput {
    const input = new NivelFormacaoCreateInput();
    input.slug = dto.slug;
    return input;
  }

  static toUpdateInput(dto: NivelFormacaoUpdateInputDto): NivelFormacaoUpdateInput {
    const input = new NivelFormacaoUpdateInput();
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: NivelFormacaoFindOneOutput): NivelFormacaoFindOneOutputDto {
    const dto = new NivelFormacaoFindOneOutputDto();
    dto.id = output.id;
    dto.slug = output.slug;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: NivelFormacaoListOutput): NivelFormacaoListOutputDto {
    const dto = new NivelFormacaoListOutputDto();
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
