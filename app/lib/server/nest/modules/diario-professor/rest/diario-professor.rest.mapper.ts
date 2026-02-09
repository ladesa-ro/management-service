import {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorUpdateInputDto,
} from "@/modules/diario-professor";
import { DiarioRestMapper } from "@/server/nest/modules/diario/rest";
import { PerfilRestMapper } from "@/server/nest/modules/perfil/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  DiarioProfessorCreateInputRestDto,
  DiarioProfessorFindOneInputRestDto,
  DiarioProfessorFindOneOutputRestDto,
  DiarioProfessorListInputRestDto,
  DiarioProfessorListOutputRestDto,
  DiarioProfessorUpdateInputRestDto,
} from "./diario-professor.rest.dto";

export class DiarioProfessorRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: DiarioProfessorFindOneInputRestDto): DiarioProfessorFindOneInputDto {
    const input = new DiarioProfessorFindOneInputDto();
    input.id = dto.id;
    return input;
  }

  static toListInput(
    dto: DiarioProfessorListInputRestDto | null,
  ): DiarioProfessorListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioProfessorListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    input["filter.diario.id"] = dto["filter.diario.id"];
    input["filter.perfil.id"] = dto["filter.perfil.id"];
    input["filter.perfil.usuario.id"] = dto["filter.perfil.usuario.id"];
    return input;
  }

  static toCreateInput(dto: DiarioProfessorCreateInputRestDto): DiarioProfessorCreateInputDto {
    const input = new DiarioProfessorCreateInputDto();
    input.situacao = dto.situacao;
    input.diario = { id: dto.diario.id };
    input.perfil = { id: dto.perfil.id };
    return input;
  }

  static toUpdateInput(
    params: DiarioProfessorFindOneInputRestDto,
    dto: DiarioProfessorUpdateInputRestDto,
  ): DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto {
    const input = new DiarioProfessorFindOneInputDto() as DiarioProfessorFindOneInputDto &
      DiarioProfessorUpdateInputDto;
    input.id = params.id;
    if (dto.situacao !== undefined) {
      input.situacao = dto.situacao;
    }
    if (dto.diario !== undefined) {
      input.diario = { id: dto.diario.id };
    }
    if (dto.perfil !== undefined) {
      input.perfil = { id: dto.perfil.id };
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(
    output: DiarioProfessorFindOneOutputDto,
  ): DiarioProfessorFindOneOutputRestDto {
    const dto = new DiarioProfessorFindOneOutputRestDto();
    dto.id = output.id;
    dto.situacao = output.situacao;
    dto.diario = DiarioRestMapper.toFindOneOutputDto(output.diario);
    dto.perfil = PerfilRestMapper.toFindOneOutputDto(output.perfil);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: DiarioProfessorListOutputDto): DiarioProfessorListOutputRestDto {
    const dto = new DiarioProfessorListOutputRestDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
