import {
  DisponibilidadeCreateInput,
  DisponibilidadeFindOneInput,
  DisponibilidadeFindOneOutput,
  DisponibilidadeListInput,
  DisponibilidadeListOutput,
  DisponibilidadeUpdateInput,
} from "@/core/disponibilidade";
import {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "./disponibilidade.rest.dto";

export class DisponibilidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: DisponibilidadeFindOneInputDto): DisponibilidadeFindOneInput {
    const input = new DisponibilidadeFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: DisponibilidadeListInputDto | null): DisponibilidadeListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DisponibilidadeListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: DisponibilidadeCreateInputDto): DisponibilidadeCreateInput {
    const input = new DisponibilidadeCreateInput();
    input.dataInicio = dto.dataInicio as unknown as string;
    input.dataFim = dto.dataFim as unknown as string | null;
    return input;
  }

  static toUpdateInput(dto: DisponibilidadeUpdateInputDto): DisponibilidadeUpdateInput {
    const input = new DisponibilidadeUpdateInput();
    if (dto.dataInicio !== undefined) {
      input.dataInicio = dto.dataInicio as unknown as string;
    }
    if (dto.dataFim !== undefined) {
      input.dataFim = dto.dataFim as unknown as string | null;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: DisponibilidadeFindOneOutput): DisponibilidadeFindOneOutputDto {
    const dto = new DisponibilidadeFindOneOutputDto();
    dto.id = output.id;
    dto.dataInicio = output.dataInicio as unknown as Date;
    dto.dataFim = output.dataFim as unknown as Date | null;
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(output: DisponibilidadeListOutput): DisponibilidadeListOutputDto {
    const dto = new DisponibilidadeListOutputDto();
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
