import {
  CidadeFindOneQuery,
  CidadeFindOneQueryResult,
  CidadeListQuery,
} from "@/modules/localidades/cidade";
import { EstadoGraphqlMapper } from "@/modules/localidades/estado/presentation.graphql/estado.graphql.mapper";
import { createListOutputMapper, createMapping, mapFilterCase } from "@/shared/mapping";
import {
  CidadeFindOneOutputGraphQlDto,
  CidadeListInputGraphQlDto,
  CidadeListOutputGraphQlDto,
} from "./cidade.graphql.dto";

const outputMapping = createMapping([
  "id",
  "nome",
  [
    "estado",
    "estado",
    (estado: unknown) =>
      EstadoGraphqlMapper.toFindOneOutputDto(
        estado as import("@/modules/localidades/estado").EstadoFindOneQueryResult,
      ),
  ],
]);

const listInputMapping = createMapping([
  "page",
  "limit",
  "search",
  "sortBy",
  mapFilterCase("filter.id"),
  mapFilterCase("filter.estado.id"),
  mapFilterCase("filter.estado.nome"),
  mapFilterCase("filter.estado.sigla"),
]);

export class CidadeGraphqlMapper {
  static toListInput(dto: CidadeListInputGraphQlDto | null): CidadeListQuery | null {
    if (!dto) return null;
    return listInputMapping.mapDefined<CidadeListQuery>(dto);
  }

  static toFindOneInput(id: number, selection?: string[]): CidadeFindOneQuery {
    const input = new CidadeFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toFindOneOutputDto(output: CidadeFindOneQueryResult): CidadeFindOneOutputGraphQlDto {
    return outputMapping.map<CidadeFindOneOutputGraphQlDto>(output);
  }

  static toListOutputDto = createListOutputMapper(
    CidadeListOutputGraphQlDto,
    CidadeGraphqlMapper.toFindOneOutputDto,
  );
}
