import {
  TurmaDisponibilidadeCreateInput,
  TurmaDisponibilidadeFindOneInput,
  TurmaDisponibilidadeFindOneOutput,
  TurmaDisponibilidadeListInput,
  TurmaDisponibilidadeListOutput,
  TurmaDisponibilidadeUpdateInput,
} from "@/modules/turma-disponibilidade";
import { DisponibilidadeRestMapper } from "@/server/nest/modules/disponibilidade/rest";
import { TurmaRestMapper } from "@/server/nest/modules/turma/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "./turma-disponibilidade.rest.dto";

export class TurmaDisponibilidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(
    dto: TurmaDisponibilidadeFindOneInputDto,
  ): TurmaDisponibilidadeFindOneInput {
    const input = new TurmaDisponibilidadeFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: TurmaDisponibilidadeListInputDto | null,
  ): TurmaDisponibilidadeListInput | null {
    if (!dto) {
      return null;
    }

    const input = new TurmaDisponibilidadeListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: TurmaDisponibilidadeCreateInputDto): TurmaDisponibilidadeCreateInput {
    const input = new TurmaDisponibilidadeCreateInput();
    input.disponibilidade = { id: dto.disponibilidade.id };
    input.turma = { id: dto.turma.id };
    return input;
  }

  static toUpdateInput(
    params: TurmaDisponibilidadeFindOneInputDto,
    dto: TurmaDisponibilidadeUpdateInputDto,
  ): TurmaDisponibilidadeFindOneInput & TurmaDisponibilidadeUpdateInput {
    const input = new TurmaDisponibilidadeFindOneInput() as TurmaDisponibilidadeFindOneInput &
      TurmaDisponibilidadeUpdateInput;
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
    output: TurmaDisponibilidadeFindOneOutput,
  ): TurmaDisponibilidadeFindOneOutputDto {
    const dto = new TurmaDisponibilidadeFindOneOutputDto();
    dto.id = output.id;
    dto.disponibilidade = DisponibilidadeRestMapper.toFindOneOutputDto(output.disponibilidade);
    dto.turma = TurmaRestMapper.toFindOneOutputDto(output.turma);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(
    output: TurmaDisponibilidadeListOutput,
  ): TurmaDisponibilidadeListOutputDto {
    const dto = new TurmaDisponibilidadeListOutputDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
