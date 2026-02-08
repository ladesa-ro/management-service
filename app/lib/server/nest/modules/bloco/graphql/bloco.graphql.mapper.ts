import {
  BlocoFindOneInput,
  BlocoFindOneOutput,
  BlocoListInput,
  BlocoListOutput,
} from "@/modules/bloco";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import { BlocoFindOneOutputDto } from "../rest/bloco.rest.dto";
import { BlocoRestMapper } from "../rest/bloco.rest.mapper";
import { BlocoListInputGqlDto, BlocoListOutputGqlDto } from "./bloco.graphql.dto";

export class BlocoGraphqlMapper {
  static toListInput(dto: BlocoListInputGqlDto | null): BlocoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new BlocoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.campus.id"] = dto.filterCampusId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): BlocoFindOneInput {
    const input = new BlocoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: BlocoFindOneOutput): BlocoFindOneOutputDto {
    return BlocoRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(output: BlocoListOutput): BlocoListOutputGqlDto {
    const dto = new BlocoListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
