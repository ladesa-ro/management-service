import {
  DiarioFindOneInput,
  DiarioFindOneOutput,
  DiarioListInput,
  DiarioListOutput,
} from "@/modules/diario";
import { DiarioFindOneOutputDto } from "../rest/diario.rest.dto";
import { DiarioRestMapper } from "../rest/diario.rest.mapper";
import { DiarioListInputGqlDto, DiarioListOutputGqlDto } from "./diario.graphql.dto";

export class DiarioGraphqlMapper {
  static toListInput(dto: DiarioListInputGqlDto | null): DiarioListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.turma.id"] = dto.filterTurmaId;
    input["filter.disciplina.id"] = dto.filterDisciplinaId;
    input["filter.ambientePadrao.id"] = dto.filterAmbientePadraoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): DiarioFindOneInput {
    const input = new DiarioFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: DiarioFindOneOutput): DiarioFindOneOutputDto {
    return DiarioRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(output: DiarioListOutput): DiarioListOutputGqlDto {
    const dto = new DiarioListOutputGqlDto();
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
