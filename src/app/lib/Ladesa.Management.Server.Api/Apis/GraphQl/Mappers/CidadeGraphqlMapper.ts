import { createListOutputMapper } from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  CidadeFindOneInputDto,
  CidadeFindOneOutputDto,
  CidadeListInputDto,
} from "@/Ladesa.Management.Application/localidades/cidade";
import {
  CidadeFindOneOutputGraphQlDto,
  CidadeListInputGraphQlDto,
  CidadeListOutputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/CidadeGraphqlDto";
import { EstadoGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/EstadoGraphqlMapper";

export class CidadeGraphqlMapper {
  static toListOutputDto = createListOutputMapper(
    CidadeListOutputGraphQlDto,
    CidadeGraphqlMapper.toFindOneOutputDto,
  );

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
}
