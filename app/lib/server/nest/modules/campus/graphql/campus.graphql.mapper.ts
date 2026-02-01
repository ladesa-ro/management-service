import {
  CampusFindOneInput,
  CampusFindOneOutput,
  CampusListInput,
  CampusListOutput,
} from "@/modules/campus";
import { CampusFindOneOutputDto } from "../rest/campus.rest.dto";
import { CampusRestMapper } from "../rest/campus.rest.mapper";
import { CampusListInputGqlDto, CampusListOutputGqlDto } from "./campus.graphql.dto";

export class CampusGraphqlMapper {
  static toListInput(dto: CampusListInputGqlDto | null): CampusListInput | null {
    if (!dto) {
      return null;
    }

    const input = new CampusListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): CampusFindOneInput {
    const input = new CampusFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: CampusFindOneOutput): CampusFindOneOutputDto {
    return CampusRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(output: CampusListOutput): CampusListOutputGqlDto {
    const dto = new CampusListOutputGqlDto();
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
