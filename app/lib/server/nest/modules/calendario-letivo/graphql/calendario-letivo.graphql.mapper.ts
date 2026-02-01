import {
  CalendarioLetivoFindOneInput,
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoListInput,
  CalendarioLetivoListOutput,
} from "@/modules/calendario-letivo";
import { CalendarioLetivoFindOneOutputDto } from "../rest/calendario-letivo.rest.dto";
import { CalendarioLetivoRestMapper } from "../rest/calendario-letivo.rest.mapper";
import {
  CalendarioLetivoListInputGqlDto,
  CalendarioLetivoListOutputGqlDto,
} from "./calendario-letivo.graphql.dto";

export class CalendarioLetivoGraphqlMapper {
  static toListInput(
    dto: CalendarioLetivoListInputGqlDto | null,
  ): CalendarioLetivoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new CalendarioLetivoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.campus.id"] = dto.filterCampusId;
    input["filter.ofertaFormacao.id"] = dto.filterOfertaFormacaoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): CalendarioLetivoFindOneInput {
    const input = new CalendarioLetivoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(
    output: CalendarioLetivoFindOneOutput,
  ): CalendarioLetivoFindOneOutputDto {
    return CalendarioLetivoRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(output: CalendarioLetivoListOutput): CalendarioLetivoListOutputGqlDto {
    const dto = new CalendarioLetivoListOutputGqlDto();
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
