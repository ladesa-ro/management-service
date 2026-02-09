import {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "@/modules/disponibilidade";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  DisponibilidadeCreateInputRestDto,
  DisponibilidadeFindOneInputRestDto,
  DisponibilidadeFindOneOutputRestDto,
  DisponibilidadeListInputRestDto,
  DisponibilidadeListOutputRestDto,
  DisponibilidadeUpdateInputRestDto,
} from "./disponibilidade.rest.dto";

export class DisponibilidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: DisponibilidadeFindOneInputRestDto): DisponibilidadeFindOneInputDto {
    const input = new DisponibilidadeFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: DisponibilidadeListInputRestDto | null,
  ): DisponibilidadeListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new DisponibilidadeListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: DisponibilidadeCreateInputRestDto): DisponibilidadeCreateInputDto {
    const input = new DisponibilidadeCreateInputDto();
    input.dataInicio = dto.dataInicio as unknown as string;
    input.dataFim = dto.dataFim as unknown as string | null;
    return input;
  }

  static toUpdateInput(dto: DisponibilidadeUpdateInputRestDto): DisponibilidadeUpdateInputDto {
    const input = new DisponibilidadeUpdateInputDto();
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

  static toFindOneOutputDto(
    output: DisponibilidadeFindOneOutputDto,
  ): DisponibilidadeFindOneOutputRestDto {
    const dto = new DisponibilidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.dataInicio = output.dataInicio as unknown as Date;
    dto.dataFim = output.dataFim as unknown as Date | null;
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(output: DisponibilidadeListOutputDto): DisponibilidadeListOutputRestDto {
    const dto = new DisponibilidadeListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
