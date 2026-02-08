import {
  EtapaCreateInput,
  EtapaFindOneInput,
  EtapaFindOneOutput,
  EtapaListInput,
  EtapaListOutput,
  EtapaUpdateInput,
} from "@/modules/etapa";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  EtapaCreateInputRestDto,
  EtapaFindOneOutputRestDto,
  EtapaUpdateInputRestDto,
} from "../rest/etapa.rest.dto";
import { EtapaListInputGqlDto, EtapaListOutputGqlDto } from "./etapa.graphql.dto";

export class EtapaGraphqlMapper {
  static toListInput(dto: EtapaListInputGqlDto | null): EtapaListInput | null {
    if (!dto) {
      return null;
    }

    const input = new EtapaListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.calendario.id"] = dto.filterCalendarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): EtapaFindOneInput {
    const input = new EtapaFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: EtapaCreateInputRestDto): EtapaCreateInput {
    return dto as unknown as EtapaCreateInput;
  }

  static toUpdateInput(dto: EtapaUpdateInputRestDto): EtapaUpdateInput {
    return dto as unknown as EtapaUpdateInput;
  }

  static toFindOneOutputDto(output: EtapaFindOneOutput): EtapaFindOneOutputRestDto {
    return output as unknown as EtapaFindOneOutputRestDto;
  }

  static toListOutputDto(output: EtapaListOutput): EtapaListOutputGqlDto {
    const dto = new EtapaListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
