import {
  DisciplinaFindOneInput,
  DisciplinaFindOneOutput,
  DisciplinaListInput,
  DisciplinaListOutput,
} from "@/modules/disciplina";
import { DisciplinaFindOneOutputDto } from "../rest/disciplina.rest.dto";
import { DisciplinaRestMapper } from "../rest/disciplina.rest.mapper";
import { DisciplinaListInputGqlDto, DisciplinaListOutputGqlDto } from "./disciplina.graphql.dto";

export class DisciplinaGraphqlMapper {
  static toListInput(dto: DisciplinaListInputGqlDto | null): DisciplinaListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DisciplinaListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.diarios.id"] = dto.filterDiariosId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): DisciplinaFindOneInput {
    const input = new DisciplinaFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: DisciplinaFindOneOutput): DisciplinaFindOneOutputDto {
    return DisciplinaRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(output: DisciplinaListOutput): DisciplinaListOutputGqlDto {
    const dto = new DisciplinaListOutputGqlDto();
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
