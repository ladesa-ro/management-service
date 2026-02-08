import {
  CidadeFindOneInput,
  CidadeFindOneOutput,
  CidadeListInput,
  CidadeListOutput,
} from "@/modules/cidade";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import { CidadeFindOneOutputDto } from "../rest/cidade.rest.dto";
import { CidadeRestMapper } from "../rest/cidade.rest.mapper";
import { CidadeListInputGqlDto, CidadeListOutputGqlDto } from "./cidade.graphql.dto";

export class CidadeGraphqlMapper {
  static toListInput(dto: CidadeListInputGqlDto | null): CidadeListInput | null {
    if (!dto) {
      return null;
    }

    const input = new CidadeListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.estado.id"] = dto.filterEstadoId;
    input["filter.estado.nome"] = dto.filterEstadoNome;
    input["filter.estado.sigla"] = dto.filterEstadoSigla;
    return input;
  }

  static toFindOneInput(id: number, selection?: string[]): CidadeFindOneInput {
    const input = new CidadeFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: CidadeFindOneOutput): CidadeFindOneOutputDto {
    return CidadeRestMapper.toFindOneOutputDto(output);
  }

  static toListOutputDto(output: CidadeListOutput): CidadeListOutputGqlDto {
    const dto = new CidadeListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
