import {
  createListInputMapper,
  createListOutputMapper,
} from "@/modules/@shared/application/mappers";
import {
  CidadeFindOneQuery,
  CidadeFindOneQueryResult,
  CidadeListQuery,
} from "@/modules/localidades/cidade";
import { EstadoRestMapper } from "@/modules/localidades/estado/presentation/rest/estado.rest.mapper";
import {
  CidadeFindOneInputRestDto,
  CidadeFindOneOutputRestDto,
  CidadeListOutputRestDto,
} from "./cidade.rest.dto";

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
    const dto = new CidadeFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.estado = EstadoRestMapper.toFindOneOutputDto(output.estado);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    CidadeListOutputRestDto,
    CidadeRestMapper.toFindOneOutputDto,
  );
}
