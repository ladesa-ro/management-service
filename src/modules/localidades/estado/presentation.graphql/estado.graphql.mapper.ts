import {
  EstadoFindOneQuery,
  EstadoFindOneQueryResult,
  EstadoListQuery,
} from "@/modules/localidades/estado";
import { createListOutputMapper, createMapping, mapFilterCase } from "@/shared/mapping";
import {
  EstadoFindOneOutputGraphQlDto,
  EstadoListInputGraphQlDto,
  EstadoListOutputGraphQlDto,
} from "./estado.graphql.dto";

const outputMapping = createMapping(["id", "nome", "sigla"]);

const listInputMapping = createMapping([
  "page",
  "limit",
  "search",
  "sortBy",
  mapFilterCase("filter.id"),
]);

export class EstadoGraphqlMapper {
  static toListInput(dto: EstadoListInputGraphQlDto | null): EstadoListQuery | null {
    if (!dto) return null;
    return listInputMapping.mapDefined<EstadoListQuery>(dto);
  }

  static toFindOneInput(id: number): EstadoFindOneQuery {
    const input = new EstadoFindOneQuery();
    input.id = id;
    return input;
  }

  static toFindOneOutputDto(output: EstadoFindOneQueryResult): EstadoFindOneOutputGraphQlDto {
    return outputMapping.map<EstadoFindOneOutputGraphQlDto>(output);
  }

  static toListOutputDto = createListOutputMapper(
    EstadoListOutputGraphQlDto,
    EstadoGraphqlMapper.toFindOneOutputDto,
  );
}
