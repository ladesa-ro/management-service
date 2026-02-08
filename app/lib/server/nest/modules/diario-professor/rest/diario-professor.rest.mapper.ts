import {
  DiarioProfessorCreateInput,
  DiarioProfessorFindOneInput,
  DiarioProfessorFindOneOutput,
  DiarioProfessorListInput,
  DiarioProfessorListOutput,
  DiarioProfessorUpdateInput,
} from "@/modules/diario-professor";
import { DiarioRestMapper } from "@/server/nest/modules/diario/rest";
import { PerfilRestMapper } from "@/server/nest/modules/perfil/rest";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorUpdateInputDto,
} from "./diario-professor.rest.dto";

export class DiarioProfessorRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: DiarioProfessorFindOneInputDto): DiarioProfessorFindOneInput {
    const input = new DiarioProfessorFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: DiarioProfessorListInputDto | null): DiarioProfessorListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioProfessorListInput();
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

  static toCreateInput(dto: DiarioProfessorCreateInputDto): DiarioProfessorCreateInput {
    const input = new DiarioProfessorCreateInput();
    input.situacao = dto.situacao;
    input.diario = { id: dto.diario.id };
    input.perfil = { id: dto.perfil.id };
    return input;
  }

  static toUpdateInput(
    params: DiarioProfessorFindOneInputDto,
    dto: DiarioProfessorUpdateInputDto,
  ): DiarioProfessorFindOneInput & DiarioProfessorUpdateInput {
    const input = new DiarioProfessorFindOneInput() as DiarioProfessorFindOneInput &
      DiarioProfessorUpdateInput;
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

  static toFindOneOutputDto(output: DiarioProfessorFindOneOutput): DiarioProfessorFindOneOutputDto {
    const dto = new DiarioProfessorFindOneOutputDto();
    dto.id = output.id;
    dto.situacao = output.situacao;
    dto.diario = DiarioRestMapper.toFindOneOutputDto(output.diario);
    dto.perfil = PerfilRestMapper.toFindOneOutputDto(output.perfil);
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: DiarioProfessorListOutput): DiarioProfessorListOutputDto {
    const dto = new DiarioProfessorListOutputDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
