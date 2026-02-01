import {
  DiarioProfessorFindOneInput,
  DiarioProfessorFindOneOutput,
  DiarioProfessorListInput,
  DiarioProfessorListOutput,
} from "@/modules/diario-professor";
import { DiarioProfessorFindOneOutputDto } from "../rest/diario-professor.rest.dto";
import { DiarioProfessorRestMapper } from "../rest/diario-professor.rest.mapper";
import {
  DiarioProfessorListInputGqlDto,
  DiarioProfessorListOutputGqlDto,
} from "./diario-professor.graphql.dto";

export class DiarioProfessorGraphqlMapper {
  static toListInput(dto: DiarioProfessorListInputGqlDto | null): DiarioProfessorListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioProfessorListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.perfil.usuario.id"] = dto.filterPerfilUsuarioId;
    input["filter.perfil.id"] = dto.filterPerfilId;
    input["filter.diario.id"] = dto.filterDiarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): DiarioProfessorFindOneInput {
    const input = new DiarioProfessorFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: DiarioProfessorFindOneOutput): DiarioProfessorFindOneOutputDto {
    return DiarioProfessorRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(output: DiarioProfessorListOutput): DiarioProfessorListOutputGqlDto {
    const dto = new DiarioProfessorListOutputGqlDto();
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
