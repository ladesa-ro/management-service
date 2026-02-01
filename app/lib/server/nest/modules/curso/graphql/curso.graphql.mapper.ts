import {
  CursoFindOneInput,
  CursoFindOneOutput,
  CursoListInput,
  CursoListOutput,
} from "@/modules/curso";
import { CursoFindOneOutputDto } from "../rest/curso.rest.dto";
import { CursoRestMapper } from "../rest/curso.rest.mapper";
import { CursoListInputGqlDto, CursoListOutputGqlDto } from "./curso.graphql.dto";

export class CursoGraphqlMapper {
  static toListInput(dto: CursoListInputGqlDto | null): CursoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new CursoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.campus.id"] = dto.filterCampusId;
    input["filter.ofertaFormacao.id"] = dto.filterOfertaFormacaoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): CursoFindOneInput {
    const input = new CursoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: CursoFindOneOutput): CursoFindOneOutputDto {
    return CursoRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(output: CursoListOutput): CursoListOutputGqlDto {
    const dto = new CursoListOutputGqlDto();
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
