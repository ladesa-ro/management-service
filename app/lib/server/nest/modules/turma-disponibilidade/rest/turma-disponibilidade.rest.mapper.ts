import {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "@/modules/turma-disponibilidade";
import { DisponibilidadeRestMapper } from "@/server/nest/modules/disponibilidade/rest";
import { TurmaRestMapper } from "@/server/nest/modules/turma/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  TurmaDisponibilidadeCreateInputRestDto,
  TurmaDisponibilidadeFindOneInputRestDto,
  TurmaDisponibilidadeFindOneOutputRestDto,
  TurmaDisponibilidadeListInputRestDto,
  TurmaDisponibilidadeListOutputRestDto,
  TurmaDisponibilidadeUpdateInputRestDto,
} from "./turma-disponibilidade.rest.dto";

export class TurmaDisponibilidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(
    dto: TurmaDisponibilidadeFindOneInputRestDto,
  ): TurmaDisponibilidadeFindOneInputDto {
    const input = new TurmaDisponibilidadeFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: TurmaDisponibilidadeListInputRestDto | null,
  ): TurmaDisponibilidadeListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new TurmaDisponibilidadeListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(
    dto: TurmaDisponibilidadeCreateInputRestDto,
  ): TurmaDisponibilidadeCreateInputDto {
    const input = new TurmaDisponibilidadeCreateInputDto();
    input.disponibilidade = { id: dto.disponibilidade.id };
    input.turma = { id: dto.turma.id };
    return input;
  }

  static toUpdateInput(
    params: TurmaDisponibilidadeFindOneInputRestDto,
    dto: TurmaDisponibilidadeUpdateInputRestDto,
  ): TurmaDisponibilidadeFindOneInputDto & TurmaDisponibilidadeUpdateInputDto {
    const input = new TurmaDisponibilidadeFindOneInputDto() as TurmaDisponibilidadeFindOneInputDto &
      TurmaDisponibilidadeUpdateInputDto;
    input.id = params.id;
    if (dto.disponibilidade !== undefined) {
      input.disponibilidade = { id: dto.disponibilidade.id };
    }
    if (dto.turma !== undefined) {
      input.turma = { id: dto.turma.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: TurmaDisponibilidadeFindOneOutputDto,
  ): TurmaDisponibilidadeFindOneOutputRestDto {
    const dto = new TurmaDisponibilidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.disponibilidade = DisponibilidadeRestMapper.toFindOneOutputDto(output.disponibilidade);
    dto.turma = TurmaRestMapper.toFindOneOutputDto(output.turma);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(
    output: TurmaDisponibilidadeListOutputDto,
  ): TurmaDisponibilidadeListOutputRestDto {
    const dto = new TurmaDisponibilidadeListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
