import {
  DiaCalendarioFindOneInput,
  DiaCalendarioFindOneOutput,
  DiaCalendarioListInput,
  DiaCalendarioListOutput,
} from "@/modules/dia-calendario";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import { DiaCalendarioFindOneOutputDto } from "../rest/dia-calendario.rest.dto";
import { DiaCalendarioRestMapper } from "../rest/dia-calendario.rest.mapper";
import {
  DiaCalendarioListInputGqlDto,
  DiaCalendarioListOutputGqlDto,
} from "./dia-calendario.graphql.dto";

export class DiaCalendarioGraphqlMapper {
  static toListInput(dto: DiaCalendarioListInputGqlDto | null): DiaCalendarioListInput | null {
    if (!dto) {
      return null;
    }

    const input = new DiaCalendarioListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.calendario.id"] = dto.filterCalendarioId;
    input["filter.calendario.nome"] = dto.filterCalendarioNome;
    input["filter.calendario.ano"] = dto.filterCalendarioAno;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): DiaCalendarioFindOneInput {
    const input = new DiaCalendarioFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: DiaCalendarioFindOneOutput): DiaCalendarioFindOneOutputDto {
    return DiaCalendarioRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(output: DiaCalendarioListOutput): DiaCalendarioListOutputGqlDto {
    const dto = new DiaCalendarioListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
