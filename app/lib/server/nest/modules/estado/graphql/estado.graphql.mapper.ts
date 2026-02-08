import {
  EstadoFindOneInput,
  EstadoFindOneOutput,
  EstadoListInput,
  EstadoListOutput,
} from "@/modules/estado";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import { EstadoFindOneOutputDto } from "../rest/estado.rest.dto";
import { EstadoListInputGqlDto, EstadoListOutputGqlDto } from "./estado.graphql.dto";

export class EstadoGraphqlMapper {
  static toListInput(dto: EstadoListInputGqlDto | null): EstadoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new EstadoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(id: number, selection?: string[]): EstadoFindOneInput {
    const input = new EstadoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: EstadoFindOneOutput): EstadoFindOneOutputDto {
    const dto = new EstadoFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.sigla = output.sigla;
    return dto;
  }

  static toListOutputDto(output: EstadoListOutput): EstadoListOutputGqlDto {
    const dto = new EstadoListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
