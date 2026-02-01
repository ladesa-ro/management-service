import {
  DiarioPreferenciaAgrupamentoFindOneInput,
  DiarioPreferenciaAgrupamentoFindOneOutput,
  DiarioPreferenciaAgrupamentoListInput,
  DiarioPreferenciaAgrupamentoListOutput,
} from "@/modules/diario-preferencia-agrupamento";
import { DiarioPreferenciaAgrupamentoFindOneOutputDto } from "../rest/diario-preferencia-agrupamento.rest.dto";
import { DiarioPreferenciaAgrupamentoRestMapper } from "../rest/diario-preferencia-agrupamento.rest.mapper";
import {
  DiarioPreferenciaAgrupamentoListInputGqlDto,
  DiarioPreferenciaAgrupamentoListOutputGqlDto,
} from "./diario-preferencia-agrupamento.graphql.dto";

export class DiarioPreferenciaAgrupamentoGraphqlMapper {
  static toListInput(
    dto: DiarioPreferenciaAgrupamentoListInputGqlDto | null,
  ): DiarioPreferenciaAgrupamentoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioPreferenciaAgrupamentoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.diario.id"] = dto.filterDiarioId;
    return input;
  }

  static toFindOneInput(
    id: string,
    selection?: string[],
  ): DiarioPreferenciaAgrupamentoFindOneInput {
    const input = new DiarioPreferenciaAgrupamentoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(
    output: DiarioPreferenciaAgrupamentoFindOneOutput,
  ): DiarioPreferenciaAgrupamentoFindOneOutputDto {
    return DiarioPreferenciaAgrupamentoRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(
    output: DiarioPreferenciaAgrupamentoListOutput,
  ): DiarioPreferenciaAgrupamentoListOutputGqlDto {
    const dto = new DiarioPreferenciaAgrupamentoListOutputGqlDto();
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
