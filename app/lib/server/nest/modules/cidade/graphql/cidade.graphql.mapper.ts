import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
  CidadeListOutputDto,
} from "@/modules/cidade";
import { EstadoGraphqlMapper } from "@/server/nest/modules/estado/graphql/estado.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  CidadeFindOneOutputGraphQlDto,
  CidadeListInputGraphQlDto,
  CidadeListOutputGraphQlDto,
} from "./cidade.graphql.dto";

export class CidadeGraphqlMapper {
  static toListInput(dto: CidadeListInputGraphQlDto | null): CidadeListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new CidadeListInputDto();
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

  static toFindOneInput(id: number, selection?: string[]): CidadeFindOneInputDto {
    const input = new CidadeFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: CidadeFindOneOutputDto): CidadeFindOneOutputGraphQlDto {
    const dto = new CidadeFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.estado = EstadoGraphqlMapper.toFindOneOutputDto(output.estado);
    return dto;
  }

  static toListOutputDto(output: CidadeListOutputDto): CidadeListOutputGraphQlDto {
    const dto = new CidadeListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
