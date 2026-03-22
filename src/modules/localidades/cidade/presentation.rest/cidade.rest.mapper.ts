import {
  CidadeFindOneQuery,
  CidadeFindOneQueryResult,
  CidadeListQuery,
} from "@/modules/localidades/cidade";
import { EstadoRestMapper } from "@/modules/localidades/estado/presentation.rest/estado.rest.mapper";
import { createListInputMapper, createListOutputMapper } from "@/shared/mapping";
import { createMapping } from "@/shared/mapping/index";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
  CidadeListOutputRestDto,
} from "./cidade.rest.dto";

const outputMapping = createMapping([
  "id",
  "nome",
  [
    "estado",
    "estado",
    (estado: unknown) =>
      EstadoRestMapper.toFindOneOutputDto(
        estado as import("@/modules/localidades/estado").EstadoFindOneQueryResult,
      ),
  ],
]);

export class CidadeRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: CidadeFindOneInputRestDto): CidadeFindOneQuery {
    const input = new CidadeFindOneQuery();
    input.id = dto.id;
    return input;
  }

  static toListInput = createListInputMapper(CidadeListQuery, [
    "filter.id",
    "filter.estado.id",
    "filter.estado.nome",
    "filter.estado.sigla",
  ]);

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: CidadeFindOneQueryResult): CidadeFindOneOutputRestDto {
    return outputMapping.map<CidadeFindOneOutputRestDto>(output);
  }

  static toListOutputDto = createListOutputMapper(
    CidadeListOutputRestDto,
    CidadeRestMapper.toFindOneOutputDto,
  );
}
