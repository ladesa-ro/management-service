import {
  EventoCreateInput,
  EventoFindOneInput,
  EventoFindOneOutput,
  EventoListInput,
  EventoListOutput,
  EventoUpdateInput,
} from "@/modules/evento";
import {
  EventoCreateInputDto,
  EventoFindOneOutputDto,
  EventoUpdateInputDto,
} from "../rest/evento.rest.dto";
import { EventoListInputGqlDto, EventoListOutputGqlDto } from "./evento.graphql.dto";

export class EventoGraphqlMapper {
  static toListInput(dto: EventoListInputGqlDto | null): EventoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new EventoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.calendario.id"] = dto.filterCalendarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): EventoFindOneInput {
    const input = new EventoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: EventoCreateInputDto): EventoCreateInput {
    return dto as unknown as EventoCreateInput;
  }

  static toUpdateInput(dto: EventoUpdateInputDto): EventoUpdateInput {
    return dto as unknown as EventoUpdateInput;
  }

  static toFindOneOutputDto(output: EventoFindOneOutput): EventoFindOneOutputDto {
    return output as unknown as EventoFindOneOutputDto;
  }

  static toListOutputDto(output: EventoListOutput): EventoListOutputGqlDto {
    const dto = new EventoListOutputGqlDto();
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
